import mongoose, { Schema, Document, Types } from 'mongoose';
import { Task } from '../interfaces/models';

export interface ITask extends Task, Document {}

const TaskSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
        title: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        description: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true,
        collection: 'tasks'
    }
);

export const Tasks = mongoose.model<ITask>('Task', TaskSchema);
