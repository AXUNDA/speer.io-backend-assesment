import NoteModel from '../db/notes.model';
import { noteDto } from '../common/dto/note.dto';
import CustomError from '../common/utils/customError';
import SharedModel from '../db/shared.model';

class noteService {
	constructor(
		private readonly Notes = NoteModel,
		private readonly Share = SharedModel
	) {}

	async createNote(dto: noteDto) {
		try {
			const newNote = await this.Notes.create(dto);
			return newNote.toJSON();
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async getNotes(user: string) {
		try {
			const myNotes = await this.Notes.find({
				user,
			});
			const notesSharedWithMe = await this.Share.find({
				sharedWith: user,
			}).populate('note');

			return {
				myNotes,
				notesSharedWithMe,
			};
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async getNote(id: string) {
		try {
			return await this.Notes.findById(id);
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async updateNote(id: string, update: noteDto) {
		try {
			return await this.Notes.findByIdAndUpdate(id, update, { new: true });
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async deleteNote(id: string) {
		try {
			return await this.Notes.findByIdAndDelete(id);
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async shareNote(sharedWith: string, note: string) {
		try {
			const shared = await this.Share.create({
				note,
				sharedWith,
			});
			return shared;
		} catch (error: any) {
			if (error.code == '11000') {
				throw new CustomError(
					'you have already shared this note with this user',
					409
				);
			} else {
				throw new CustomError(error.message, 500);
			}
		}
	}
	async searchForNote(query: string, user: string) {
		try {
			const myNotes = await this.Notes.find({
				user,
				$or: [
					{ title: { $regex: query, $options: 'i' } },
					{ description: { $regex: query, $options: 'i' } },
				],
			});
			const notesSharedWithMe = await this.Share.find({
				sharedWith: user,
			}).populate('note');

			const filtered = notesSharedWithMe.map((note: any) => {
				if (note.title.includes(query) || note.description.includes(query)) {
					return note;
				}
			});
			return {
				myNotes,
				sharedWithMe: filtered,
			};
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
	async getNotesSharedWithMe(user: string) {
		try {
			return await this.Share.find({
				sharedWith: user,
			});
		} catch (error: any) {
			throw new CustomError(error.message, 500);
		}
	}
}

export default new noteService();
