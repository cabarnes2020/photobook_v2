import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
/** Retrieves all photographers in database */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Returns all
        const users = await User.find({});

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Retrieve a photographer by its id */
export const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Creates new instance of Photographer model */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    try {
        const newUser = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
        await newUser.save();

        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

/** Update an instance of a photographer  */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (user) {
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Not found' });
    }
};

/** Delete a specific photographer from the db */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return await User.findByIdAndDelete(userId).then((user) => (user ? res.status(201).json({ message: `${user.userName} has been deleted` }) : res.status(404).json({ message: 'Not found' })));
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, password, firstName, lastName } = req.body;

    //Ensure that all fields were inputted by user on signup
    if (!userName || !email || !password || !firstName || !lastName) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    //Check if user is already registered
    const checkIfUserExists = await User.findOne({ email });
    if (checkIfUserExists) {
        res.status(400);
        throw new Error('This user already exists.');
    }

    //Hash password so it is secure in database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword
    });

    console.log(`Created new user: ${userName}`);

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error('User data is not valid.');
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //Ensure that all fields were inputted by user on signup
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    //Check if user exists in db
    const someUser = await User.findOne({ email });
    if (!someUser) {
        res.status(400);
        throw new Error(`This user doesn't exist`);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET must be defined');
    }

    //Compare password with hashed password in db, then create JWT token
    if (someUser && (await bcrypt.compare(password, someUser.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    userName: someUser.userName,
                    email: someUser.email,
                    id: someUser.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error('Email or password is not valid.');
    }
};
