import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

export default function checkToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) return res.sendStatus(401); // Unauthorized
		jwt.verify(
			token,
			process.env.jwt_key as string,
			async (err: any, payload: any) => {
				if (err) {
					return res.sendStatus(403); // forbidden
				}

				if (!payload) {
					return res.sendStatus(403); // forbidden
				}
				res.locals.user = payload;
				return next();
			}
		);
	} catch (err) {
		next(err);
	}
}
