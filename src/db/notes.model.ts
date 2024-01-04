import { Schema, model, Types } from 'mongoose';

interface note {
	title: string;
	description: string;
	user: Types.ObjectId;
}

const noteSchema = new Schema<note>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const NoteModel = model<note>('Note', noteSchema);

export default NoteModel;
export { note };
