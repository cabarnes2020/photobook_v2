import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/httpException.js';


export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong that has not been accounted for in error handling"

    res.status(status).json({
        message: message,
        stack: err.stack
    })
}