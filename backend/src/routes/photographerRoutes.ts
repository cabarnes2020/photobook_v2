import express from 'express';
import { createPhotographer, deletePhotographer, getAllPhotographers, getPhotographerById, loginPhotographer, updatePhotographer } from '../controllers/PhotographerController.js';
import { authorize } from '../middleware/authMiddleware.js';

const photographerRouter = express.Router();

photographerRouter.route('/').get(getAllPhotographers).post(createPhotographer)
photographerRouter.route('/login').post(loginPhotographer)

photographerRouter.route('/:id').get(getPhotographerById).put(updatePhotographer).delete(deletePhotographer)

export default photographerRouter