import express from 'express';
import http from 'http';
import { errorHandler } from './common/middlewares/errorHandler';
import { notFound } from './common/middlewares/notFound';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connect from './db/connect';
import auth from './auth/auth.routes';
import notes from './notes/notes.routes';
import checkToken from './common/middlewares/checkToken';
import notesController from './notes/notes.controller';
import { rateLimiter } from './common/middlewares/rateLimiter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.use(rateLimiter);
app.use('/api/auth', auth);
app.use('/api/notes', notes);
app.get('/api/search', checkToken, notesController.search);
app.get('/', (req, res) =>
	res.status(200).json({
		status: 'active',
	})
);

app.use(errorHandler);
app.use(notFound);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
	console.log('listening');
});

server.on('listening', async () => {
	await connect();
});

export default server;
