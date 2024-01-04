import { Request, Response, NextFunction, response } from 'express';
import authService from './auth.service';

export default {
	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await authService.signup(req.body);
			return res.status(201).json({ ...response });
		} catch (error) {
			next(error);
		}
	},
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const response = await authService.login(req.body);
			return res.status(200).json({ ...response });
		} catch (error) {
			next(error);
		}
	},
};
