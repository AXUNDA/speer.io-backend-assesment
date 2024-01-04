import mongoose from 'mongoose';

async function connect() {
	return mongoose
		.connect(process.env.DB_URI as string)
		.then(() => {
			console.log('connected to db');
		})
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}

export default connect;
