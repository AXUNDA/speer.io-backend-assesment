import { Request, Response, NextFunction } from 'express';

export async function notFound(
	req: Request,
	res: Response,
	next: NextFunction
) {
	return res.status(404).send({
		status: 'error',
		message: 'endpoint not found',
	});
}
