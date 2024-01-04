import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';

export async function errorHandler(
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			msg: err.message,
			success: false,
		});
	} else {
		return res.status(500).json({
			msg: err.message,
			success: false,
		});
	}
}
