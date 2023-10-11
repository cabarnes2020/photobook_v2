import mongoose, {Document, Schema, Types} from 'mongoose'

export interface IUser {
    firstName: string,
    lastName: string, 
    email: string,
    userName: string,
    password: string
}

export interface IUserModel extends IUser, Document {}


const UserSchema = new Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
})