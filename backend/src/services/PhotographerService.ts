import bcrypt from 'bcrypt'

import { checkIsValidObjectId } from "../database/db.js";
import Photographer, { IPhotographer, IPhotographerDocument, SecurePhotographerReturn } from "../models/Photographer.js";
import HttpException from "../utils/httpException.js";
import { generateToken, generateTokenPhotographer } from './TokenService.js';
import { sanitizeLogin, sanitizePhotographer } from '../sanitizers/photographerSanitizer.js';


export async function getAllPhotographersService(): Promise<IPhotographer[]> {
    try {
        // Returns all users in db
        const photographers = await Photographer.find({});
        if(!photographers) throw new HttpException(404, 'No photographers found ')
        return photographers
    } catch (err) {
        throw new HttpException(404, `Error finding photographers: ${err}`)
    }
};

/** Get a photographer by its id */
export async function getPhotographerByIdService(photographerId: string): Promise<IPhotographerDocument> {
    checkIsValidObjectId(photographerId)
    try {
        const photographer = await Photographer.findById(photographerId);
        if(!photographer) throw new Error('Photographer not found')
        return photographer
    } catch (err) {
        throw new HttpException(400, `Error finding photographer: ${err}`)    
    }
};

/** Creates new instance of Photographer model */
export async function createPhotographerService(photographer: IPhotographer): Promise<SecurePhotographerReturn> {
    const cleanPhotographer = await sanitizePhotographer(photographer)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(cleanPhotographer.password, salt)
    
    try {
        const newPhotographer = await Photographer.create({
            firstName: cleanPhotographer.firstName,
            lastName: cleanPhotographer.lastName,
            email: cleanPhotographer.email,
            password: hashedPassword,    
            gallery: cleanPhotographer.gallery,
            reviews: []   
         }) 
        
        if(!newPhotographer) throw new HttpException(400, 'Photographer not created')

        return {
            _id: newPhotographer._id,
            firstName: newPhotographer.firstName,
            lastName: newPhotographer.lastName,
            email: newPhotographer.email,
            gallery: newPhotographer.gallery,
            token: generateTokenPhotographer({
                _id: newPhotographer._id,
            firstName: newPhotographer.firstName,
            lastName: newPhotographer.lastName,
            email: newPhotographer.email,
            gallery: newPhotographer.gallery,
            }),
        }
    } catch (err) {
        throw new HttpException(400, `Error creating photographer: ${err}`)
    }
};

export async function loginPhotographerService(email: string, password: string): Promise<SecurePhotographerReturn> {
    const sanitizedPhotographer = await sanitizeLogin(email, password)
    try{
        const photographer = await Photographer.findOne({ email })
        if(!photographer) throw new HttpException(404, 'Photographer not found')

        const isPasswordValid = await bcrypt.compare(sanitizedPhotographer.password, photographer.password)
        if(!isPasswordValid){
         throw new HttpException(401, 'User password is invalid')
        }


        return {
            _id: photographer._id,
            firstName: photographer.firstName,
            lastName: photographer.lastName,
            email: photographer.email,
            gallery: photographer.gallery,
            token: generateTokenPhotographer({
                _id: photographer._id,
            firstName: photographer.firstName,
            lastName: photographer.lastName,
            email: photographer.email,
            gallery: photographer.gallery
            })
        }
    } catch(err){
        throw new HttpException(401, `Error logging photographer in: ${err}`)
    }
}

/** Update an instance of a photographer  */
export async function updatePhotographerService(photographerId: string, photographer: IPhotographer): Promise<IPhotographer> {
    checkIsValidObjectId(photographerId)
    const cleanPhotographer = await sanitizePhotographer(photographer)
    try{
        const updatedPhotographer = await Photographer.findByIdAndUpdate(photographerId, cleanPhotographer, { new: true });
        if (!updatedPhotographer) throw new HttpException(404, 'Photographer not found')
        return updatedPhotographer
    } catch (err) {
        throw new HttpException(400, `Error updating photographer: ${err}`)
    }
};

/** Delete a specific photographer from the db */
export async function deletePhotographerService(photographerId: string): Promise<void> {
    checkIsValidObjectId(photographerId)

    try{
        const deletedPhotographer = await Photographer.findByIdAndDelete(photographerId)
        if(!deletedPhotographer) throw new HttpException(404, 'Photographer not found')
    } catch(err){
        throw new HttpException(400, `Error deleting photographer: ${err}`)
    }
};