import { prop, modelOptions, Ref } from '@typegoose/typegoose';
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

  @prop({ ref: () => Member, foreignField: 'user', localField: '_id', justOne: true, autopopulate: true })
  public member?: Ref<Member>;
}

// const UserModel = getModelForClass(User);

export {
  User,
  // UserModel
};
