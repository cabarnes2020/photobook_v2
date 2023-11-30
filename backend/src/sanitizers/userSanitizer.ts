import { IUser } from "../models/User.js";
import HttpException from "../utils/httpException.js";

export function sanitizeUser(user: IUser): IUser {
    if(!user) throw new HttpException(400, 'User is not defined')

    let sanitizedUser = <IUser>{}

    sanitizedUser.firstName = sanitizeFirstName(user.firstName)
    sanitizedUser.lastName = sanitizeLastName(user.lastName)
    sanitizedUser.email = sanitizeEmail(user.email)
    sanitizedUser.userName = sanitizeUserName(user.userName)
    sanitizedUser.password = sanitizePassword(user.password)
    return sanitizedUser
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
    
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/

    if(!emailRegex.test(email)) throw new HttpException(400, 'Email is not valid')

    return email.trim()
}

function sanitizeUserName(userName: string): string {
    if(userName === undefined) throw new HttpException(400, 'Username is undefined')

    if(typeof userName !== 'string') throw new HttpException(400, 'Username is not a string')

    //Gets rid of unnecessary white space
    userName = userName.trim()

    if(userName.length < 4) throw new HttpException(400, 'Username must be 4 characters or more')

    if(userName.length > 50) throw new HttpException(400, 'Username must be shorter than 50 characters')

    return userName
}

//will likely need to add checks for hashedPasswords
function sanitizePassword(password: string): string {
    if(password === undefined) throw new HttpException(400, 'Password is undefined')

    if(typeof password !== 'string') throw new HttpException(400, 'Password is not a string')

    //Gets rid of unnecessary white space
    password = password.trim()

    if(password.length < 6) throw new HttpException(400, 'Password must be 6 characters or more')


    return password
}