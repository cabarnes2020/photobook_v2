import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    password: { type: String, required: true, minlength: 8, select: false }
});

export default mongoose.model<IUserModel>('User', UserSchema);
