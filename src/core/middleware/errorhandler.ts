import { Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response) => {
	if (err) {
		res.send({ Title: 'Error', Message: err.message });
	}
    console.error(err)
};
export default errorHandler;
