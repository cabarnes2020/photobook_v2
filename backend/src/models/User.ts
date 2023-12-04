import mongoose, {Document, Schema, Types} from 'mongoose'

//base for simple validation
export interface IUser {
    firstName: string,
    lastName: string, 
    email: string,
    userName: string,
    password: string
}

export interface IUserDocument extends IUser, Document {}

export interface SecureUserReturn {
    _id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    token: string
}
const UserSchema: Schema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    }, 
    {
        timestamps: true
    })

export default mongoose.model<IUserDocument>('User', UserSchema);
