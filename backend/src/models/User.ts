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


const UserSchema: Schema = new Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        userName: {type: String, required: true},
        password: {type: String, required: true},
    }, 
    {
        timestamps: true
    })

export default mongoose.model<IUserDocument>('User', UserSchema);
