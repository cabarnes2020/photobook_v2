import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler'
import HttpException from '../utils/httpException.js';
import { createReviewService, deleteReviewService, getAllReviewsService, getReviewByIdService, updateReviewService } from '../services/ReviewService.js';

/** Retrieves all reviews in database */
export const getAllReviews = asyncHandler( async (req: Request, res: Response) => {
    const reviews = await getAllReviewsService()
    res.status(200).json(reviews)

});

/** Retrieve a review by its id */
export const getReviewByID = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id) throw new HttpException(400, 'Review ID is missing')
    const review = await getReviewByIdService(req.params.id);
    res.status(201).json(review)

});

/** Creates new instance of Review model */
export const createReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newReview = await createReviewService(req.body);
    res.status(201).json(newReview)
});

/** Update a review  */
export const updateReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id) throw new HttpException(400, 'Review ID is missing')
    const reviewId = req.params.id;

    const updatedReview = await updateReviewService(reviewId, req.body)
    res.status(200).json(updatedReview)
});

/** Delete a specific photographer from the db */
export const deleteReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id) throw new HttpException(400, 'Review ID is missing')
    await deleteReviewService(req.params.id)

    res.status(200).json({message: `Review ${req.params.id} is deleted`})
});
