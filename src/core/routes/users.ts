import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
// import { auth } from '../middleware/auth';
import { signup, login } from '../controllers/users';

const userRouter = express.Router();

userRouter.post('/register', asyncHandler(signup));
userRouter.post('/login', asyncHandler(login));
// userRouter.get('/:id', auth, asyncHandler(getOne));
// userRouter.put('/:id', auth, asyncHandler(update));
// userRouter.delete('/:id', auth, asyncHandler(destroy));

export default userRouter;
