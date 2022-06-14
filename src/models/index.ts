import { getModelForClass } from '@typegoose/typegoose';
import { Community } from '@models/community.model';
import { Member } from '@models/member.model';
import { User } from '@models/user.model';
import { IModelOptions } from '@typegoose/typegoose/lib/types';

const globalOptions: IModelOptions = {
  schemaOptions: {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  },
};

const CommunityModel = getModelForClass(Community, globalOptions);
const MemberModel = getModelForClass(Member, globalOptions);
const UserModel = getModelForClass(User, globalOptions);

export type Model = typeof CommunityModel | typeof MemberModel | typeof UserModel;

export { UserModel, MemberModel, CommunityModel };
