import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, ForgotPasswordDto, ResetPasswordDto } from '@dtos/user.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /auth/signup:
     *   post:
     *     summary: Signup a new user
     *     description: Create a new user account
     *     tags: ["Authentication"]
     */
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    this.router.post(`${this.path}/forgot-password`, validationMiddleware(ForgotPasswordDto, 'body'), this.authController.forgotPassword);
    this.router.post(`${this.path}/reset-password`, validationMiddleware(ResetPasswordDto, 'body'), this.authController.resetPassword);
  }
}

export default AuthRoute;
