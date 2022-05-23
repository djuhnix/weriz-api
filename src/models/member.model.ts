import { prop, getModelForClass, modelOptions, DocumentType, Ref } from '@typegoose/typegoose';
import DefaultModel from '@models/default.model';
import { Community } from '@models/community.model';
import { User } from '@models/user.model';

@modelOptions({ schemaOptions: { collection: 'members', timestamps: true } })
class Member extends DefaultModel {
  @prop({ type: String, required: true, unique: true })
  public firstname: string;

  @prop({ type: String, required: true })
  public lastname: string;

  @prop({
    default: function (this: DocumentType<Member>) {
      return `${this.firstname} ${this.lastname}`;
    },
  })
  public fullName?: string;

  @prop({ ref: () => User, required: true })
  public user: Ref<User>;

  @prop({ ref: () => Community, required: true, default: [] })
  public communities?: Ref<Community>[];
}

// const MemberModel = getModelForClass(Member);

export {
  Member,
  // MemberModel
};
