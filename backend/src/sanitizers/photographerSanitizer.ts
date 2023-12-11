import { IPhotographer } from "../models/Photographer.js";
import HttpException from "../utils/httpException.js";



export async function sanitizePhotographer(photographer: IPhotographer): Promise<IPhotographer> {
    if(!photographer) throw new HttpException(400, 'Photographer is not defined')

    let sanitizedPhotographer = <IPhotographer>{}

    sanitizedPhotographer.firstName = sanitizeFirstName(photographer.firstName)
    sanitizedPhotographer.lastName = sanitizeLastName(photographer.lastName)
    sanitizedPhotographer.email = sanitizeEmail(photographer.email)
    sanitizedPhotographer.gallery = sanitizeGallery(photographer.gallery)
    sanitizedPhotographer.password = await sanitizePassword(photographer.password)
    return sanitizedPhotographer
}

export async function sanitizeLogin(email: string, password: string): Promise<IPhotographer> {
    let sanitizedPhotographer = <IPhotographer>{}

    sanitizedPhotographer.email = sanitizeEmail(email)
    sanitizedPhotographer.password = await sanitizePassword(password)

    return sanitizedPhotographer
}

function sanitizeFirstName(firstName: string): string {
    if(firstName === undefined) throw new HttpException(400, 'First name is undefined')

    if(typeof firstName !== 'string') throw new HttpException(400, 'First name is not a string')

    //Gets rid of unnecessary white space
    firstName = firstName.trim()

    if(firstName.length < 3) throw new HttpException(400, 'First name must be 3 characters or more')

    if(firstName.length > 50) throw new HttpException(400, 'First name must be shorter than 50 characters')

    return firstName
}

function sanitizeLastName(lastName: string): string {
    if(lastName === undefined) throw new HttpException(400, 'Last name is undefined')

    if(typeof lastName !== 'string') throw new HttpException(400, 'Last name is not a string')

    //Gets rid of unnecessary white space
    lastName = lastName.trim()

    if(lastName.length < 2) throw new HttpException(400, 'Last name must be 2 characters or more')

    if(lastName.length > 50) throw new HttpException(400, 'Last name must be shorter than 50 characters')

    return lastName
}

function sanitizeEmail(email: string): string {
    if(email === undefined) throw new HttpException(400, 'Email is undefined')

    if(typeof email !== 'string') throw new HttpException(400, 'Email is not a string')

    
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

    if(!emailRegex.test(email)) throw new HttpException(400, 'Email is not valid')

    return email.trim()
}

function sanitizeGallery(gallery: string[]): string[] {
    if(gallery === undefined) throw new HttpException(400, 'Gallery is undefined')

    if(!Array.isArray(gallery)) throw new HttpException(400, 'Gallery is not an array')

    //Gets rid of unnecessary white space
    if(gallery.length < 4) throw new HttpException(400, 'Gallery must be 4 images or more')

    if(gallery.length > 10) throw new HttpException(400, 'Gallery must be 10 images or less')

    return gallery
}

async function sanitizePassword(password: string): Promise<string> {
    if(password === undefined) throw new HttpException(400, 'Password is undefined')

    if(typeof password !== 'string') throw new HttpException(400, 'Password is not a string')

    //Gets rid of unnecessary white space
    password = password.trim()

    if(password.length < 6) throw new HttpException(400, 'Password must be 6 characters or more')

    return password
}