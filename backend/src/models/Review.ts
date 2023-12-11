import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview {
    reviewer: Types.ObjectId;
    content: string;
}

export interface IReviewDocument extends IReview, Document {}

const ReviewSchema: Schema = new Schema(
    {
        reviewer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        content: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IReviewDocument>('Review', ReviewSchema);
