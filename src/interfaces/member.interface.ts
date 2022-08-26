import { User } from '@models/user.model';
import { Community } from '@interfaces/community.interface';

export interface Member {
  _id: string;
  firstname: string;
  lastname: string;
  user: User;
  communities: Community[];
}
