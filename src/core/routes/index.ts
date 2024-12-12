import express from 'express';
import userRouter from './users';
import taskRouter from './tasks';

const router = express.Router();

router.use('/', userRouter);
router.use('/todos', taskRouter)

export default router;
