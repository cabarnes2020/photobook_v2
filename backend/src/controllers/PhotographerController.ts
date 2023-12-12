import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler'

import HttpException from '../utils/httpException.js';
import { getAllPhotographersService, getPhotographerByIdService, createPhotographerService, deletePhotographerService, updatePhotographerService, loginPhotographerService } from '../services/PhotographerService.js';

/** Retrieves all photographers in database */
export const getAllPhotographers = asyncHandler(async (req: Request, res: Response) => {
        // Returns all photographers
        const photographers = await getAllPhotographersService()

        res.status(200).json(photographers);
});

/** Retrieve a photographer by its id */
export const getPhotographerById = asyncHandler(async (req: Request, res: Response) => {
    if(!req.params.id) throw new HttpException(400, 'Photographer ID is missing')
        
    const photographer = await getPhotographerByIdService(req.params.id);
     res.status(200).json(photographer);
});

/** Creates new instance of Photographer model */
export const createPhotographer = asyncHandler(async (req: Request, res: Response) => {
    const newPhotographer = await createPhotographerService(req.body)
  
    res.status(201).json(newPhotographer);
});

export const loginPhotographer = asyncHandler(async (req: Request, res: Response) => {
    const loggedInPhotographer = await loginPhotographerService(req.body.email, req.body.password)

    res.status(201).json(loggedInPhotographer)
})

/** Update an instance of a photographer  */
export const updatePhotographer = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
   if(!req.params.id) throw new HttpException(400, 'Photographer ID is missing.')

   const updatedPhotographer = await updatePhotographerService(req.params.id, req.body)
   res.status(200).json(updatedPhotographer)
});

/** Delete a specific photographer from the db */
export const deletePhotographer = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.params.id) throw new HttpException(400, 'Photographer ID is missing.')
    
    await deletePhotographerService(req.params.id)
    res.status(200).json({message: `Photographer ${req.params.id} is deleted.`})
};

