import { object, string } from 'zod';

export const createUserSchema = object({
	body: object({
		email: string({
			required_error: 'email is required',
		}).email('a valid email is required'),

		password: string({
			required_error: 'password is required',
		}).min(6, ' password is too short must be 6 characters minimum'),
	}),
});
