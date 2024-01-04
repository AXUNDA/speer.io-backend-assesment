import express, { Router } from 'express';
import validate from '../common/middlewares/validate';
import { createNoteSchema } from '../common/schema/note.schema';

import notesController from './notes.controller';
import checkToken from '../common/middlewares/checkToken';
const router: Router = express.Router();
router.use(checkToken);

router.get('/', notesController.getAllNotes);
router.get('/:id', notesController.getNote);
router.post('/', validate(createNoteSchema), notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);
router.post('/:id/share', notesController.shareNote);
// router.get('/search', notesController.search);

export default router;
