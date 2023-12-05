import bcrypt from 'bcrypt'

import { checkIsValidObjectId } from "../database/db.js";
import Review, { IReview, IReviewDocument } from "../models/Review.js";
import { sanitizeLogin, sanitizeUser } from "../sanitizers/userSanitizer.js";
import HttpException from "../utils/httpException.js";
import { generateToken } from './TokenService.js';
import User, { SecureUserReturn } from '../models/User.js';
import { sanitizeReview } from '../sanitizers/reviewSanitizer.js';


export async function getAllReviewsService(): Promise<IReview[]> {
    try {
        // Returns all users in db
        const reviews = await Review.find({});
        if(!reviews) throw new HttpException(404, 'No reviews found ')
        return reviews
    } catch (err) {
        throw new HttpException(404, `Error finding reviews: ${err}`)
    }
};

/** Get a photographer by its id */
export async function getReviewByIdService(reviewId: string): Promise<IReviewDocument> {
    checkIsValidObjectId(reviewId)
    try {
        const review = await Review.findById(reviewId);
        if(!review) throw new Error('Review not found')
        return review
    } catch (err) {
        throw new HttpException(400, `Error finding review: ${err}`)    
    }
};

/** Creates new instance of Photographer model */
export async function createReviewService(review: IReview): Promise<IReview> {
    // checkIsValidObjectId(review.reviewer.toString())
    const cleanReview = await sanitizeReview(review)
    
    try {
        const newReview = await Review.create({
            content: cleanReview.content,
            reviewer: cleanReview.reviewer,
        }) 
        
        if(!newReview) throw new HttpException(400, 'Review not created')

        return newReview
    } catch (err) {
        throw new HttpException(400, `Error creating review: ${err}`)
    }
};

/** Update an instance of a photographer  */
export async function updateReviewService(reviewId: string, review: IReview): Promise<IReview> {
    checkIsValidObjectId(reviewId)
    const cleanReview = await sanitizeReview(review)
    try{
        const updatedReview = await Review.findByIdAndUpdate(reviewId, cleanReview, { new: true });
        if (!updatedReview) throw new HttpException(404, 'Review not found')
        return updatedReview
    } catch (err) {
        throw new HttpException(400, `Error updating review: ${err}`)
    }
};

/** Delete a specific photographer from the db */
export async function deleteReviewService(reviewId: string): Promise<void> {
    checkIsValidObjectId(reviewId)

    try{
        const deletedReview = await Review.findByIdAndDelete(reviewId)
        if(!deletedReview) throw new HttpException(404, 'Review not found')
    } catch(err){
        throw new HttpException(400, `Error deleting user: ${err}`)
    }
};