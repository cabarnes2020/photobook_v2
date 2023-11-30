import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from '../services/UserService.js';
import HttpException from '../utils/httpException.js';
dotenv.config();
/** Gets all photographers in database */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
   const users = await getAllUsersService()

   res.status(200).json(users)
});

/** Get a photographer by its id */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    if(!req.params.id) throw new HttpException(400, 'User ID is missing')

    const user = await getUserByIdService(req.params.id)
 
    res.status(200).json(user)
 });

/** Creates new instance of Photographer model */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const newUser = await createUserService(req.body)
 
    res.status(201).json(newUser)
 });

/** Update an instance of a photographer  */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    if(!req.params.id) throw new HttpException(400, 'User ID is missing')

    const updatedUser = await updateUserService(req.params.id, req.body)
 
    res.status(200).json(updatedUser)
 });

/** Delete a specific photographer from the db */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    if(!req.params.id) throw new HttpException(400, 'User ID is missing')

    await deleteUserService(req.params.id)
 
    res.status(200).json({message: `User ${req.params.id} is deleted`})
 });

// export const registerUser = asyncHandler(async (req: Request, res: Response) => {
//     const registeredUser = await registerUserService()
 
//     res.status(200).json(registeredUser)
//  });

// export const login = asyncHandler(async (req: Request, res: Response) => {
//     const loggedInUser = await loginService()
 
//     res.status(200).json(loggedInUser)
//  });