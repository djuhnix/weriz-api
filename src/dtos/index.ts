import { CreateUserDto, GetUserDto } from '@dtos/user.dto';
import { CreateMemberDto } from '@dtos/member.dto';
import { CreateCommunityDto } from '@dtos/community.dto';

type DTO = CreateUserDto | GetUserDto | CreateMemberDto | CreateCommunityDto;

export default DTO;
