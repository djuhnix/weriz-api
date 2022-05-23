import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models';
import { isEmpty } from '@utils/util';
import UserService from '@services/users.service';
import { logger } from '@utils/logger';

class AuthService {
  private readonly _name = AuthService.name + '.';
  private userService = new UserService();

  public async signup(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  public async login(userData: CreateUserDto): Promise<{ user: User; cookie: string; tokenData: TokenData }> {
    logger.info(this._name + this.login.name + '.start', { test: 'hello' });
    if (isEmpty(userData)) throw new HttpException(400, `User data are empty`);

    const emailFilter = { email: userData.email };
    const user: User = await UserModel.findOne(emailFilter);

    if (!user) throw new HttpException(409, `Email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    user.authenticated = true;
    UserModel.updateOne(emailFilter, user, { upsert: true }).catch(AuthService.handleUserAuthenticatedDBUpdate);

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    user.password = undefined;

    return { cookie, user, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, `Unable to logout. ${userData.email} not logged.`);

    const user: void | User = await UserModel
      .findOneAndUpdate({ email: userData.email }, { authenticated: false }, { returnDocument: 'after', projection: { password: 0 } })
      .catch(AuthService.handleUserAuthenticatedDBUpdate);
    if (!user) throw new HttpException(409, `Email ${userData.email} not found`);

    return user;
  }

  private static handleUserAuthenticatedDBUpdate(error) {
    if (error) {
      logger.error(error);
      throw new HttpException(500, `Error updating user.authenticated to true`);
    }
    logger.info('user.authenticated set to true');
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
