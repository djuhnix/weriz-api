import { Member } from '@interfaces/member.interface';

export interface Community {
  _id: string;
  name: string;
  code?: string;
  members: Member[];
}
