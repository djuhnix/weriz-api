import { prop, modelOptions, Ref, ReturnModelType } from '@typegoose/typegoose';
import { Community } from '@models/community.model';
import { User } from '@models/user.model';
import DefaultModel from '@models/default.model';
import { checkObjectId } from '@utils/util';

@modelOptions({ schemaOptions: { collection: 'members' } })
class Member extends DefaultModel {
  @prop({ type: String, required: false, unique: true, trim: true, index: true, sparse: true })
  public email: string;

  @prop({ type: Boolean, required: false, default: false })
  public emailVerified: boolean;

  @prop({ type: String, required: false })
  public firstname: string;

  @prop({ type: String, required: false })
  public lastname: string;

  @prop({ ref: () => User, required: true /*, foreignField: 'member', localField: '_id', justOne: true */ })
  public user: Ref<User>;

  @prop({ ref: () => Community, required: true, default: [], foreignField: 'members', localField: '_id', justOne: false })
  public communities?: Ref<Community>[];

  public get fullName() {
    return this.firstname && this.lastname ? `${this.firstname} ${this.lastname}` : '';
  }

  public static async findByUser(this: ReturnModelType<typeof Member>, userId: string) {
    checkObjectId(userId);
    return this.findOne({ user: userId }).exec();
  }
}

export { Member };
