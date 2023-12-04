import bcrypt from 'bcrypt'

import { checkIsValidObjectId } from "../database/db.js";
import User, { IUserDocument } from "../models/User.js";
import { IUser } from "../models/User.js";
import { sanitizeLogin, sanitizeUser } from "../sanitizers/userSanitizer.js";
import HttpException from "../utils/httpException.js";


export async function getAllUsersService(): Promise<IUser[]> {
    try {
        // Returns all users in db
        const users = await User.find({});
        if(!users) throw new Error('No users found ')
        return users
    } catch (err) {
        throw new Error('Error finding users')
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
        throw new Error(`Error finding user`)    
    }
};

/** Creates new instance of Photographer model */
export async function createUserService(user: IUser): Promise<IUser> {
    const cleanUser = await sanitizeUser(user)
    
    try {
        const newUser = await User.create(cleanUser) 
        
        if(!newUser) throw new Error('User not created')
        return newUser
    } catch (err) {
        throw new Error(`Error creating user`)
    }
};

export async function loginUserService(email: string, password: string): Promise<IUser> {
    const sUser = await sanitizeLogin(email, password)
    try{
        const sanitizedUser = await User.findOne({email})
        if(!sanitizedUser) throw new Error('User not found in database')

        const isPasswordValid = await bcrypt.compare(password, sanitizedUser.password)
        if(!isPasswordValid){
         throw new Error('User password is invalid')
        }


        return sanitizedUser
    } catch(err){
        throw new Error(`Error logging user in: ${err}`)
    }
}

/** Update an instance of a photographer  */
export async function updateUserService(userId: string, user: IUser): Promise<IUser> {
    checkIsValidObjectId(userId)
    const cleanUser = await sanitizeUser(user)
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, cleanUser, { new: true });
        if (!updatedUser) throw new Error('User could not be updated')
        return updatedUser
    } catch (err) {
        throw new Error(`Error updating user`)
    }
};

/** Delete a specific photographer from the db */
export async function deleteUserService(userId: string): Promise<void> {
    checkIsValidObjectId(userId)

    try{
        const deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser) throw new Error('User could not be deleted')
    } catch(err){
        throw new Error(`Error deleting user`)
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