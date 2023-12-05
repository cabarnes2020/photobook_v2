import bcrypt from 'bcrypt'

import { checkIsValidObjectId } from "../database/db.js";
import User, { IUserDocument, SecureUserReturn } from "../models/User.js";
import { IUser } from "../models/User.js";
import { sanitizeLogin, sanitizeUser } from "../sanitizers/userSanitizer.js";
import HttpException from "../utils/httpException.js";
import { generateToken } from './TokenService.js';


export async function getAllUsersService(): Promise<IUser[]> {
    try {
        // Returns all users in db
        const users = await User.find({});
        if(!users) throw new HttpException(404, 'No users found ')
        return users
    } catch (err) {
        throw new HttpException(404, `Error finding users: ${err}`)
    }
};

/** Get a photographer by its id */
export async function getUserByIdService(userId: string): Promise<IUserDocument> {
    checkIsValidObjectId(userId)
    try {
        const user = await User.findById(userId);
        if(!user) throw new Error('User not found')
        return user
    } catch (err) {
        throw new HttpException(400, `Error finding user: ${err}`)    
    }
};

/** Creates new instance of Photographer model */
export async function createUserService(user: IUser): Promise<SecureUserReturn> {
    const cleanUser = await sanitizeUser(user)
    //Hash the password for security within db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(cleanUser.password, salt)
    
    try {
        const newUser = await User.create({
            firstName: cleanUser.firstName,
            lastName: cleanUser.lastName,
            email: cleanUser.email,
            userName: cleanUser.userName,
            password: hashedPassword,
        }) 
        
        if(!newUser) throw new HttpException(400, 'User not created')

        return {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userName: newUser.userName,
            email: newUser.email,
            token: generateToken({
                _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            userName: newUser.userName,
            email: newUser.email,
            })
        }
    } catch (err) {
        throw new HttpException(400, `Error creating user: ${err}`)
    }
};

export async function loginUserService(email: string, password: string): Promise<SecureUserReturn> {
    const sanitizedUser = await sanitizeLogin(email, password)
    try{
        const user = await User.findOne({ email })
        if(!user) throw new HttpException(404, 'User not found')

        const isPasswordValid = await bcrypt.compare(sanitizedUser.password, user.password)
        if(!isPasswordValid){
         throw new HttpException(401, 'User password is invalid')
        }


        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            token: generateToken({
                _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            })
        }
    } catch(err){
        throw new HttpException(401, `Error logging user in: ${err}`)
    }
}

/** Update an instance of a photographer  */
export async function updateUserService(userId: string, user: IUser): Promise<IUser> {
    checkIsValidObjectId(userId)
    const cleanUser = await sanitizeUser(user)
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, cleanUser, { new: true });
        if (!updatedUser) throw new HttpException(404, 'User not found')
        return updatedUser
    } catch (err) {
        throw new HttpException(400, `Error updating user: ${err}`)
    }
};

/** Delete a specific photographer from the db */
export async function deleteUserService(userId: string): Promise<void> {
    checkIsValidObjectId(userId)

    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser) throw new HttpException(404, 'User not found')
    } catch(err){
        throw new HttpException(400, `Error deleting user: ${err}`)
    }
};

// export const registerUserService = async (req: Request, res: Response, next: NextFunction) => {
//     const { userName, email, password, firstName, lastName } = req.body;

//     //Ensure that all fields were inputted by user on signup
//     if (!userName || !email || !password || !firstName || !lastName) {
//         res.status(400);
//         throw new Error('All fields are mandatory!');
//     }

//     //Check if user is already registered
//     const checkIfUserExists = await User.findOne({ email });
//     if (checkIfUserExists) {
//         res.status(400);
//         throw new Error('This user already exists.');
//     }

//     //Hash password so it is secure in database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         userName,
//         password: hashedPassword
//     });

//     console.log(`Created new user: ${userName}`);

//     if (newUser) {
//         res.status(201).json(newUser);
//     } else {
//         res.status(400);
//         throw new Error('User data is not valid.');
//     }
// };

// export const loginService = async (req: Request, res: Response, next: NextFunction) => {
//     const { email, password } = req.body;

//     //Ensure that all fields were inputted by user on signup
//     if (!email || !password) {
//         res.status(400);
//         throw new Error('All fields are mandatory!');
//     }

//     //Check if user exists in db
//     const someUser = await User.findOne({ email });
//     if (!someUser) {
//         res.status(400);
//         throw new Error(`This user doesn't exist`);
//     }

//     if (!process.env.ACCESS_TOKEN_SECRET) {
//         throw new Error('ACCESS_TOKEN_SECRET must be defined');
//     }

//     //Compare password with hashed password in db, then create JWT token
//     if (someUser && (await bcrypt.compare(password, someUser.password))) {
//         const accessToken = jwt.sign(
//             {
//                 user: {
//                     userName: someUser.userName,
//                     email: someUser.email,
//                     id: someUser.id
//                 }
//             },
//             process.env.ACCESS_TOKEN_SECRET
//         );
//         res.status(200).json({ accessToken });
//     } else {
//         res.status(401);
//         throw new Error('Email or password is not valid.');
//     }
// };