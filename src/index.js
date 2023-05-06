require('dotenv').config();
const expres = require('express');
const cors = require('cors');
const configCors = require('./config/cors');
const { taskRouter, columnRouter, boardRouter } = require('./routes');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 9000;

const app = expres();

// log all requests
app.all('*', (req, _res, next) => {
	console.log('\nAccessing ...');
	console.info('Request origin =>', req.headers.origin);
	console.info('Request method =>', req.method);
	console.info('Request path =>', req.path);
	console.info('Body =>', req.body);
	try {
		next();
	} catch (err) {
		console.error('Error =>', err);
	}
});

// midsleware
app.use(cors(configCors.application.cors));
app.use(expres.json());
app.use('/api/task', taskRouter);
app.use('/api/column', columnRouter);
app.use('/api/board', boardRouter);

// connect to db
connectDB();

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
});
