import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import HttpException from '../utils/httpException.js'
import { verifyToken } from '../services/TokenService.js'
import { getUserByIdService } from '../services/UserService.js'
import { IUser } from '../models/User.js'


// export interface GetUserFromAuthInfoRequest extends Request {
//     user: IUser
// }
export const authorize = asyncHandler(async(req: Request | any, res: Response, next: NextFunction) => {
    //expecting {headers: {authorization: "Bearer token"}}

    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
        throw new HttpException(401, 'Unauthorized')
    }
    
    //grabs token from request header
    const token = req.headers.authorization.split(' ')[1] || ''
    const decoded = verifyToken(token)

    //adds user object to req object
    req.user = await getUserByIdService(decoded._id)
    next()
})