import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { auth } from '../middleware/auth';
import { create, update, getOne, getAll, destroy } from '../controllers/tasks';

const taskRouter = express.Router();

taskRouter.post('/', auth, asyncHandler(create));
taskRouter.get('/:id', auth, asyncHandler(getOne));
taskRouter.get('/', auth, asyncHandler(getAll));
taskRouter.put('/:id', auth, asyncHandler(update));
taskRouter.delete('/:id', auth, asyncHandler(destroy));

export default taskRouter;
