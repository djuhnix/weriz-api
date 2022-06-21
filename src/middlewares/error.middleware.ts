import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { NODE_ENV } from '@config';
import { isInstance } from 'class-validator';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = isInstance(error, HttpException) ? error.message : 'internal_error';
    logger.error(`status = ${status}, message = ${message}`);

    res.status(status).json({ message, error: NODE_ENV == 'development' ? error : {} });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
