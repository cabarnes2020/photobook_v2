import express, { Request, Response, NextFunction } from 'express';

const userRouter = express.Router();

//Route to get all users
//@access: public
userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

//Route to get a user
//@access: public
userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

//Route to create a new user
//@access: public
userRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

//Route to update a user
//@access: public
userRouter.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

//Route to delete a user
//@access: public
userRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.body.userName;
    res.json({ message: `${userName} is registered` });
});

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
