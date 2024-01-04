import supertest from 'supertest';
import server from '../index';

const request = supertest;

var token = null;
let noteId = null;
let user2Id = null;

describe('app unit tests', () => {
	beforeAll(async () => {});

	afterAll(async () => {
		server.close();
	});

	it('should signup and create a first user', async () => {
		const res = await request(server).post('/api/auth/signup').send({
			email: 'exapmle1@example.com',
			password: '123456789',
		});
		expect(res.statusCode).toEqual(201);
	});
	it('should signup and create a second user', async () => {
		const res = await request(server).post('/api/auth/signup').send({
			email: 'exapmle2@example.com',
			password: '123456789',
		});
		expect(res.statusCode).toEqual(201);
		user2Id = res.body.data._id;
	});
	it('should return a status of 200 and return user data and authetication token', async () => {
		const res = await request(server).post('/api/auth/login').send({
			email: 'exapmle1@example.com',
			password: '123456789',
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			data: {
				email: expect.any(String),
				_id: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				__v: expect.any(Number),
			},
			token: expect.any(String),
		});
		token = res.body.token;
	});

	it('should return a staus code of 200,and create a note', async () => {
		const res = await request(server)
			.post('/api/notes')
			.set('Authorization', 'Bearer ' + token)
			.send({
				title: 'an example title',
				description: 'an example description',
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toEqual({
			title: expect.any(String),
			description: expect.any(String),
			user: expect.any(String),

			_id: expect.any(String),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			__v: expect.any(Number),
		});
		noteId = res.body._id;
	});
	it('should return a staus code of 200,and update the note', async () => {
		const res = await request(server)
			.put(`/api/notes/${noteId}`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				title: 'title updated',
				description: 'an example description',
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			title: 'title updated',
			description: expect.any(String),
			user: expect.any(String),

			_id: noteId,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			__v: expect.any(Number),
		});
	});
	it('should return a staus code of 200,fetch a single note', async () => {
		const res = await request(server)
			.get(`/api/notes/${noteId}`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				title: 'title updated',
				description: 'an example description',
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			title: expect.any(String),
			description: expect.any(String),
			user: expect.any(String),

			_id: noteId,
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
			__v: expect.any(Number),
		});
	});
	it('should return a staus code of 200,fetch all the notes', async () => {
		const res = await request(server)
			.get(`/api/notes/`)
			.set('Authorization', 'Bearer ' + token);

		expect(res.statusCode).toEqual(200);

		expect(res.body).toHaveProperty('notesSharedWithMe');
		expect(Array.isArray(res.body.notesSharedWithMe)).toBe(true);
	});
	it('should return a staus code of 200,fetch notes based on the search query', async () => {
		const res = await request(server)
			.get(`/api/search?q=updated`)
			.set('Authorization', 'Bearer ' + token);

		expect(res.statusCode).toEqual(200);

		res.body.notes.myNotes.forEach((note) => {
			expect(note).toEqual(
				expect.objectContaining({
					_id: expect.any(String),
					title: 'title updated',
					description: expect.any(String),
					user: expect.any(String),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
					__v: expect.any(Number),
				})
			);
		});
	});
	it('should share the note with the second user', async () => {
		const res = await request(server)
			.post(`/api/notes/${noteId}/share`)
			.set('Authorization', 'Bearer ' + token)
			.send({
				recepient: user2Id,
			});

		expect(res.statusCode).toEqual(200);
	});
});
