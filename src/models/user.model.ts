import { prop, modelOptions, Ref, ReturnModelType } from '@typegoose/typegoose';
import DefaultModel from '@models/default.model';
import { Member } from '@models/member.model';
import { checkObjectId } from '@utils/util';

@modelOptions({ schemaOptions: { collection: 'users' } })
class User extends DefaultModel {
  @prop({ type: String, required: true, unique: true })
  public username: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ default: false })
  public authenticated?: boolean;

  @prop({ ref: () => Member, foreignField: 'user', localField: '_id', justOne: true, autopopulate: true })
  public member?: Ref<Member>;

  public static async findByMember(this: ReturnModelType<typeof User>, memberId: string) {
    checkObjectId(memberId);
    return this.findOne({ member: memberId }).exec();
  }
}

export {
  User,
  // UserModel
};
