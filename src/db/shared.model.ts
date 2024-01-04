import { Schema, model, Types } from 'mongoose';

interface shared {
	note: Types.ObjectId;
	sharedWith: Types.ObjectId;
}

const sharedSchema = new Schema<shared>(
	{
		note: {
			type: Schema.Types.ObjectId,
			ref: 'Note',
			required: true,
			unique: true,
		},
		sharedWith: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

const SharedModel = model<shared>('Shared', sharedSchema);

export default SharedModel;
export { sharedSchema };
