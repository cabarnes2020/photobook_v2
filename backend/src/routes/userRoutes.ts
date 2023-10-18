import express, { Request, Response, NextFunction } from 'express';

const userRouter = express.Router();

//Route to register new user
//@access: public
userRouter.post('/register', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

//Route to login user
//@access: public
userRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is logged in` });
});

export default userRouter;
