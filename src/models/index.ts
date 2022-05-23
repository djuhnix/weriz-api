import { getModelForClass } from '@typegoose/typegoose';
import { Community } from '@models/community.model';
import { Member } from '@models/member.model';
import { User } from '@models/user.model';

const CommunityModel = getModelForClass(Community);
const MemberModel = getModelForClass(Member);
const UserModel = getModelForClass(User);

export { UserModel, MemberModel, CommunityModel };
