import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose';
import DefaultModel from '@models/default.model';
import { Member } from '@models/member.model';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User extends DefaultModel {
  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ default: false })
  public authenticated?: boolean;

  @prop({ ref: () => Member, default: {} })
  public member: Ref<Member>;
}

// const UserModel = getModelForClass(User);

export {
  User,
  // UserModel
};
