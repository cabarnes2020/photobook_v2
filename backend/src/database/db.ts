import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";
import HttpException from "../utils/httpException.js";

export const connectDB = async () => {
    if(!MONGO_URL){
        console.log('MONGO_URL is not defined in the env file')
        process.exit(1)
    }
    try {
        await mongoose.connect(MONGO_URL, { retryWrites: true, w: 'majority' });
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log('Error connecting to MongoDB', e);
        process.exit(1)
    }
}

export function checkIsValidObjectId(id: string){
    if(!mongoose.isValidObjectId(id)){
        throw new HttpException(400, `${id} is not a valid id`)
    }
}