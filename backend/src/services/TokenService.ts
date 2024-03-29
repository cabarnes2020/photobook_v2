import jwt, {JwtPayload} from "jsonwebtoken"
import { JWT_SECRET } from "../config/config.js"
import HttpException from "../utils/httpException.js"

//Use this interface to play nicely with TS. 
//Allows me to do token.userName or token.firstName after verifying a token
interface UserPayload extends JwtPayload {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,

}

export function generateToken(user: UserPayload): string {
    return jwt.sign(user, JWT_SECRET, {
        expiresIn: '1d'
    } )
}


export function verifyToken(token: string): UserPayload {
    try{
        return jwt.verify(token, JWT_SECRET) as UserPayload
    } catch(err){
        throw new HttpException(401, 'Invalid token')
    }
}