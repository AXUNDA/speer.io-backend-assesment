import { object, string } from 'zod';

export const createNoteSchema = object({
	body: object({
		title: string({
			required_error: 'title is required',
		}),

		description: string({
			required_error: 'description is required',
		}),
	}),
});
