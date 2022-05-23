import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { CreateUserDto, GetUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .get(validationMiddleware(GetUserDto, 'query'), this.userController.getUsers)
      .post(validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);

    this.router
      .route(`${this.path}/:id`)
      .get(this.userController.getUserById)
      .put(validationMiddleware(CreateUserDto, 'body', true), this.userController.updateUser)
      .delete(this.userController.deleteUser);

    this.router.route(`${this.path}/connected`).get(authMiddleware, this.userController.getConnected);
  }
}

export default UserRoute;
