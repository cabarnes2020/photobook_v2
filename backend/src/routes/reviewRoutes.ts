import express, { Request, Response, NextFunction } from 'express';
import { getAllReviews, createReview, getReviewByID, updateReview, deleteReview} from '../controllers/ReviewController.js';
import { authorize } from '../middleware/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.route('/').get(getAllReviews).post(createReview)
reviewRouter.route('/:id').get(getReviewByID).put(updateReview).delete(deleteReview)


export default reviewRouter