import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 75,
	message: 'You have exceeded the 75 requests per minute limit!',
	standardHeaders: true,
	legacyHeaders: false,
});
