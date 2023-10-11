import mongoose, {Schema, Document, Types} from 'mongoose'

export interface IReview {
    reviewer: Types.ObjectId,
    content: string
}

export interface IReviewModel extends IReview, Document {}

const ReviewSchema = new Schema<IReview>({
    reviewer: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    content: {type: String, required: true}
})

