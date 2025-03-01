import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import beaconsRoute from './api/routes/beacons.route.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const dirname = path.resolve();

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(dirname, '/public')));
app.use(express.json());

app.use('/api', beaconsRoute);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on Port ${PORT}`));
