import { Request, Response} from 'express';
import { ITask, Tasks } from '../models/tasks';
import { handleError, isAuthorizedUser, userExists } from '../helpers';

export const create = async (req: Request, res: Response): Promise<void> => {
    if (res.locals && await userExists(res.locals.userDetails.id)) {        
        const title: string = req.body.title;
        const description: string = req.body.description;
    
        if (!title) {
            return handleError(res, 400, 'Title Field is Mandatory')
        }
        const result = { title, description, user_id: res.locals.userDetails.id };
        const task = await Tasks.create(result);

        if (task) {
            res.status(201).send({ title: result.title, description: result.description });
            return;
        } else {
            return handleError(res, 400, 'Invalid Data sent during task creation')
        }
	} else {
        return handleError(res, 401, 'Unauthorized')
	}
}

export const getOne = async ( req: Request, res: Response ): Promise<void> => {
	if (!res.locals) {
        return handleError(res, 401, 'Unauthorized')
	} else {
		const id: string = req.params.id;
        const task: ITask | null = await Tasks.findById(id);

		if (task && isAuthorizedUser(task, res.locals.userDetails.id)) {
				res.status(200).send({ title: task.title, description: task.description });
                return;
		} else {
            return handleError(res, 401, 'Unauthorized');
		}
	}
};

export const getAll = async ( req: Request, res: Response ): Promise<void> => {
	if (res.locals && await userExists(res.locals.userDetails.id)) {
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 5;
        const offset: number = (page - 1) * limit;

        const [data, total] = await Promise.all([
                Tasks
                .find({ user_id: res.locals.userDetails.id })
                .select(['_id', 'title', 'description'])
                .skip(offset)
                .limit(limit),
                Tasks.countDocuments({user_id: res.locals.userDetails.id}),
        ]);
        
		if (data.length > 0) {
            const result = { data, page, limit, total }
            res.status(200).send(result);
            return;
		} else {
            return handleError(res, 200, 'No Tasks Exist');
		}
    } else {
        return handleError(res, 401, 'Unauthorized')
	}
};

export const update = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals) {
        return handleError(res, 401, 'Unauthorized')

	} else {
        const id: string = req.params.id;
        let task: ITask | null = await Tasks.findById(id);        

        if (task && isAuthorizedUser(task, res.locals.userDetails.id)) {
            const title: string | undefined = req.body.title;
            const description: string | undefined = req.body.description;

            task.title = title === undefined ? task.title: title
            task.description = description === undefined ? task.description: description

            await task.save()

            res.status(200).send({ id: task.id, title: task.title, description: task.description });
            return;
        } else {
            return handleError(res, 403, 'Forbidden');
        }
	}
}

export const destroy = async (req: Request,res: Response): Promise<void> => {
	if (!res.locals) {
        return handleError(res, 401, 'Unauthorized')
	} else {

        const id: string = req.params.id;
        let task: ITask | null = await Tasks.findById(id);

        if (task && isAuthorizedUser(task, res.locals.userDetails.id)) {

            await task.deleteOne()

            res.status(204).send();
            return;
        } else {
            return handleError(res, 403, 'Forbidden');
        }
	}
};
