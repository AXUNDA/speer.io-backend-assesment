import express, { Router } from 'express';
import authController from './auth.controller';
const router: Router = express.Router();
import validate from '../common/middlewares/validate';
import { createUserSchema } from '../common/schema/auth.schema';

router.post('/login', validate(createUserSchema), authController.login);
router.post('/signup', validate(createUserSchema), authController.signup);

export default router;
