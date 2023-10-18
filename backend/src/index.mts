import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

// async function connectToMongoDB(connectionString: string) {
//     await mongoose.connect(connectionString)
//     console.log('Connected to MongoDB database!')
// }

const app = express();

/** Connect to Mongo */
try {
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    console.log('Connected to MongoDB');
} catch (e) {
    console.log('Error connecting to MongoDB', e);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

/** Rules of the API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Resquested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/api/users', userRouter);

/** Make sure server is working correctly */
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});

app.listen(config.server.port, () => {
    console.log(`App is listening on port ${config.server.port}`);
});
