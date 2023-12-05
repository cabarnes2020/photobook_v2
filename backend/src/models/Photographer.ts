import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IPhotographer {
    // id: Types.ObjectId,
    firstName: string;
    lastName: string;
    email: string;
    gallery: Types.Array<string>;
    reviews?: Types.Array<Types.ObjectId>;
}

export interface IPhotographerModel extends IPhotographer, Document {}

const PhotographerSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        gallery: [{ type: String }],
        reviews: [{ type: Schema.Types.ObjectId, default: [], ref: 'Review' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPhotographerModel>('Photographer', PhotographerSchema);
