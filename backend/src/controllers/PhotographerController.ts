import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Photographer from '../models/Photographer.js'

/** Retrieves all photographers in database */
export const getAllPhotographers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // Returns all
        const photographers = await Photographer.find({})

        return res.status(200).json(photographers)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

/** Retrieve a photographer by its id */
export const getPhotographerByID = async (req: Request, res: Response, next: NextFunction) => {
    const photographerId = req.params.photographerId
    try{

        const photographer = await Photographer.findById(photographerId)

        return res.status(200).json(photographer)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

/** Creates new instance of Photographer model */
export const createPhotographer = async (req: Request, res: Response, next: NextFunction)  => {
    const {photographer} = req.body
    try{
        const newPhotographer = new Photographer({
            _id: new mongoose.Types.ObjectId(),
            firstName: photographer.firstName,
            lastName: photographer.lastName,
            email: photographer.email,
            gallery: photographer.gallery,
        })
        await newPhotographer.save()

        return res.status(200).json(newPhotographer)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

/** Update an instance of a photographer  */
const updatePhotographer = async (req: Request, res: Response, next: NextFunction) => {
    const photographerId = req.params.photographerId

    try{
        const photographer = await Photographer.findByIdAndUpdate(photographerId, req.body, {new: true})
   
        if(photographer){
            return res.status(200).json(photographer)
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'Not found'})
    }
}
    
/** Delete a specific photographer from the db */
const deletePhotographer = async (req: Request, res: Response, next: NextFunction) => {
    const photographerId = req.params.photographerId

    return Photographer.findByIdAndDelete(photographerId).then((photographer) => (photographer ? res.status(201).json({ message: 'Photographer has been deleted'}) : res.status(404).json({message: 'Not found'})))
}

// const createPhotographer = (req: Request, res: Response, next: NextFunction) => {
    
// }

// const createPhotographer = (req: Request, res: Response, next: NextFunction) => {
    
// }
