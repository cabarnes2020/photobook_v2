import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

/** Retrieves all reviews in database */
export const getAllReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Returns all
        const reviews = await Review.find({});

        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Retrieve a review by its id */
export const getReviewByID = async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.userId;
    try {
        const review = await Review.findById(reviewId);

        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Creates new instance of Review model */
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    const { review } = req.body;
    try {
        const newReview = new Review({
            reviewer: review.reviewer,
            content: review.content
        });
        await newReview.save();

        return res.status(200).json(newReview);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Update a review  */
export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    try {
        const review = await Review.findByIdAndUpdate(reviewId, req.body, { new: true });

        if (review) {
            return res.status(200).json(review);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Not found' });
    }
};

/** Delete a specific photographer from the db */
export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.reviewId;

    return await Review.findByIdAndDelete(reviewId).then((user) => (user ? res.status(201).json({ message: 'Review has been deleted' }) : res.status(404).json({ message: 'Not found' })));
};
