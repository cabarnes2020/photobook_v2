import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPhotographer {
    // id: Types.ObjectId,
    firstName: string;
    lastName: string;
    email: string;
    password: string
    gallery: string[];
    reviews?: Types.Array<Types.ObjectId>;
}

export interface IPhotographerDocument extends IPhotographer, Document {}

export interface SecurePhotographerReturn {
    _id: string,
    firstName: string,
    lastName: string,
    gallery: string[],
    reviews?: Types.Array<Types.ObjectId>,
    email: string,
    token: string
}

const PhotographerSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: {type: String, required: true},
        gallery: [{ type: String }],
        reviews: [{ type: Schema.Types.ObjectId, default: [], ref: 'Review' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPhotographerDocument>('Photographer', PhotographerSchema);
