import { User } from '@models/user.model';

export interface Member {
  _id: string;
  firstname: string;
  lastname: string;
  user: User;
}
