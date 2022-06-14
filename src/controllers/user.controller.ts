import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, GetUserDto } from '@dtos/user.dto';
import { User } from '@models/user.model';
import UserService from '@services/user.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import { logger } from '@utils/logger';

class UserController {
  private _name = UserService.name + '.';
  private userService = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'getUsers.start');
    try {
      const filter: GetUserDto = req.query;
      const findAllUsersData: User[] = await this.userService.findAllUser(filter);
      logger.info(this._name + 'getUsers.end');
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getConnected = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    logger.info(this.getConnected.name, 'start');
    try {
      const userData: User = req.user;
      logger.info(this.getConnected.name, 'end');
      res.status(200).json({ data: userData, message: 'connected' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
