import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, GetUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}`)
      .get(validationMiddleware(GetUserDto, 'query'), this.usersController.getUsers)
      .post(validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);

    this.router
      .route(`${this.path}/:id`)
      .get(this.usersController.getUserById)
      .put(validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser)
      .delete(this.usersController.deleteUser);

    this.router.route(`${this.path}/connected`).get(authMiddleware, this.usersController.getConnected);
  }
}

export default UsersRoute;
