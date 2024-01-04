import { Request, Response, NextFunction, response } from 'express';
import notesServices from './notes.services';

export default {
	async createNote(req: Request, res: Response, next: NextFunction) {
		const { _id } = res.locals.user;
		try {
			req.body.user = _id;
			const note = await notesServices.createNote(req.body);
			return res.status(201).json(note);
		} catch (error) {
			next(error);
		}
	},
	async getAllNotes(req: Request, res: Response, next: NextFunction) {
		try {
			const { _id } = res.locals.user;
			const notes = await notesServices.getNotes(_id);
			return res.status(200).json(notes);
		} catch (error) {
			next(error);
		}
	},
	async getNote(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			const note = await notesServices.getNote(id);
			return res.status(200).json(note);
		} catch (error) {
			next(error);
		}
	},
	async updateNote(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			const updatedNote = await notesServices.updateNote(id, req.body);
			return res.status(200).json(updatedNote);
		} catch (error) {
			next(error);
		}
	},
	async deleteNote(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			await notesServices.deleteNote(id);
			return res.sendStatus(200);
		} catch (error) {
			next(error);
		}
	},
	async shareNote(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { recepient } = req.body;
			const shared = await notesServices.shareNote(recepient, id);
			return res.status(200).json(shared);
		} catch (error) {
			next(error);
		}
	},

	async search(req: Request, res: Response, next: NextFunction) {
		const query = req.query.q;
		// console.log(req.query);
		const { _id } = res.locals.user;
		try {
			const notes = await notesServices.searchForNote(query as string, _id);
			return res.status(200).json({ notes });
		} catch (error) {
			console.log(error);

			next(error);
		}
	},
	async getNotesSharedWithMed(req: Request, res: Response, next: NextFunction) {
		try {
			const { _id } = res.locals.user;
			const notes = await notesServices.getNotesSharedWithMe(_id);
			return res.status(200).json(notes);
		} catch (error) {
			next(error);
		}
	},
};
