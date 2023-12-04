import express, { Request, Response, NextFunction } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/login').post(loginUser)

userRouter.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)
// //Route to get all users
// //@access: public
// userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `Get all users` });
// });

// //Route to get a user
// //@access: public
// userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `Got the ${req.params.id} user` });
// });

// //Route to create a new user
// //@access: public
// userRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    
//     res.json({ message: `Created a new user` });
// });

// //Route to update a user
// //@access: public
// userRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `${req.params.id} user is updated` });
// });

// //Route to delete a user
// //@access: public
// userRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `${req.params.id} user is deleted`});
// });

// //Route to register new user
// //@access: public
// userRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `User is registered` });
// });

// //Route to login user
// //@access: public
// userRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
//     res.json({ message: `User is logged in` });
// });


export default userRouter;
