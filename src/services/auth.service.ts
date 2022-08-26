import { compare } from 'bcrypt';
import { sign, decode, JwtPayload, verify } from 'jsonwebtoken';
import { APP_CLIENT_URL } from '@config';
import { CreateUserDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@models/user.model';
import { UserModel } from '@/models';
import { isEmpty } from '@utils/util';
import UserService from '@services/user.service';
import { logger } from '@utils/logger';
import MailerService from '@services/mailer.service';

class AuthService {
  private readonly _name = AuthService.name + '.';
  private userService = new UserService();
  private mailerService = new MailerService();

  public async signup(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  public async login(userData: CreateUserDto): Promise<{ user: User; cookie: string; tokenData: TokenData }> {
    logger.info(this._name + this.login.name + '.start', { test: 'hello' });
    if (isEmpty(userData)) throw new HttpException(400, `User data are empty`);

    const usernameFilter = { username: userData.username };
    const user: User = await UserModel.findOne(usernameFilter);

    if (!user) throw new HttpException(500, `Username ${userData.username} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    user.authenticated = true;
    UserModel.updateOne(usernameFilter, user, { upsert: true }).catch(AuthService.handleUserAuthenticatedDBUpdate);

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    user.password = undefined;

    return { cookie, user, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, `Unable to logout. ${userData.username} not logged.`);

    const user: void | User = await UserModel.findOneAndUpdate(
      { username: userData.username },
      { authenticated: false },
      { returnDocument: 'after', projection: { password: 0 } },
    ).catch(AuthService.handleUserAuthenticatedDBUpdate);
    if (!user) throw new HttpException(500, `Username ${userData.username} not found`);

    return user;
  }

  public async forgotPassword(email: string) {
    logger.info(this._name + 'forgotPassword.start');
    const user = await this.userService.findUserByEmail(email);
    // const member: Member = user.member;
    if (!user) throw new HttpException(404, 'user not found');
    const token = this.createToken(user).token;

    logger.info(this._name + 'forgotPassword.end');
    return this.mailerService.sendEmail(email, 'Reinitialisation de mot de passe', 'password_reset', {
      username: user.username,
      client_url: APP_CLIENT_URL,
      token: token,
    });
  }

  public async resetPassword(password: string, token: string): Promise<User> {
    logger.info(this._name + 'resetPassword.start');
    const payload: JwtPayload | string = decode(token);
    logger.info('reset password token payload', payload);
    const user: User = await this.userService.findUserById(payload['id']);
    if (!user) throw new HttpException(404, 'user not found');

    try {
      verify(token, user.password + user.id + user.createdAt);
      logger.info('reset password token verified');
    } catch (error) {
      logger.error('an error occurred while verifying token', error);
      throw new HttpException(401, 'Unable to verify the token');
    }
    logger.info(this._name + 'resetPassword.end');
    return await this.userService.updateUser(user.id, { password: password });
  }

  private static handleUserAuthenticatedDBUpdate(error) {
    if (error) {
      logger.error(error);
      throw new HttpException(500, `Error updating user.authenticated to true`);
    }
    logger.info('user.authenticated set to true');
  }

  public createToken(user: User, expire = 3600): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = user.password + user.id + user.createdAt; // SECRET_KEY;
    const expiresIn: number = expire;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
