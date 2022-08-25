import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/user.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@models/user.model';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, user, tokenData } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: { user, tokenData }, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: Pick<CreateUserDto, 'email'> = req.body;
      const resultData: boolean = await this.authService.forgotPassword(userData.email);
      res.status(200).json({ data: resultData, message: resultData ? 'email sent' : 'error sending email' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: Pick<CreateUserDto, 'password'> & { token: string } = req.body;
      const resultData: User = await this.authService.resetPassword(userData.password, userData.token);
      res.status(200).json({ data: resultData, message: 'password reset' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
