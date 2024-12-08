import { Response } from 'express';

export function handleError(res: Response, statusCode: number, message: string, title: string = 'Error'): never {
  res.status(statusCode).send({
    Title: title,
    Message: message,
  });
  throw new Error(message);
}
