import { hash } from 'bcrypt';
import { CreateUserDto, GetUserDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@/models';
import { checkEmpty, checkObjectId } from '@utils/util';
import MemberService from '@services/member.service';
import { logger } from '@utils/logger';

class UserService {
  private users = UserModel;
  private memberService = new MemberService();
  private readonly _name = UserService.name + '.';

  public async findAllUser(filter: GetUserDto | Partial<CreateUserDto> = undefined): Promise<User[]> {
    return this.users.find(filter, { password: 0 });
  }

  public async findUserById(userId: string): Promise<User> {
    checkObjectId(userId);

    const findUser: User = await this.users.findOne({ _id: userId }, { password: 0 });
    if (!findUser) throw new HttpException(409, 'Your not user');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    logger.info(this._name + 'createUser.start');
    checkEmpty(userData);

    logger.info('trying to find user');
    const findUser: User = await this.users.findOne({ email: userData.email });
    logger.info('user', findUser);
    if (findUser) throw new HttpException(409, `Email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    logger.info('password hashed');

    const user: User = await this.users.create({ ...userData, password: hashedPassword });
    user.password = undefined;

    await this.memberService.createMember({ userId: user._id });
    logger.info(this._name + 'createUser.end');
    return user;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    checkEmpty(userData);

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    checkEmpty(updateUserById, true);

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    checkEmpty(deleteUserById, true);

    return deleteUserById;
  }
}

export default UserService;
