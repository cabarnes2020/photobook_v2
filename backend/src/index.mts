import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './database/db.js';
import { PORT } from './config/config.js';

dotenv.config();


const app = express();

/** Connect to Mongo */
connectDB()

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
app.use('/api/reviews', reviewRouter)
app.use(errorHandler)

/** Make sure server is working correctly */
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});