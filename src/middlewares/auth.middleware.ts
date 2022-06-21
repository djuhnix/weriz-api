import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { logger } from '@utils/logger';
import { UserModel } from '@/models';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  logger.info(authMiddleware.name, 'start');
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const verificationResponse = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await UserModel.findById(userId);

      if (findUser) {
        logger.info('user fetched from request data ', findUser);
        req.user = findUser;
        logger.info(authMiddleware.name, 'end');
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    logger.error(error.message, error);
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
