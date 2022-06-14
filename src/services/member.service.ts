import { MemberModel } from '@/models';
import { CreateMemberDto } from '@dtos/member.dto';
import { Member } from '@models/member.model';
import { checkEmpty, checkObjectId } from '@utils/util';
import { logger } from '@utils/logger';
import BaseService from '@services/base.service';

class MemberService extends BaseService<Member> {
  private readonly _name = MemberService.name + '.';
  private members = MemberModel;
  protected model = MemberModel;

  public async findAllMember(filter: Partial<CreateMemberDto> = undefined): Promise<Member[]> {
    return this.members.find(filter);
  }

  public async findMemberById(memberId: string): Promise<Member> {
    logger.info(this._name + 'findMemberById.start');

    checkObjectId(memberId);
    const member: Member = await this.members.findOne({ _id: memberId });
    checkEmpty(member, true);

    logger.info(this._name + 'findMemberById.end');
    return member;
  }

  public async createMember(memberData: CreateMemberDto): Promise<Member> {
    logger.info(this._name + 'createMember.start');
    checkEmpty(memberData);
    checkObjectId(memberData.userId);

    const result = await this.members.findOrCreate({
      firstname: memberData.firstname,
      lastname: memberData.lastname,
      user: { _id: memberData.userId },
    });
    const member: Member = result.doc;

    logger.info(`member ${result.created ? 'created' : 'found'}`, JSON.stringify(member));
    logger.info(this._name + 'createMember.end');
    return member;
  }

  public async updateMember(memberId: string, memberData: CreateMemberDto): Promise<Member> {
    logger.info(this._name + 'updateMember.start');
    checkEmpty(memberData);
    checkObjectId(memberId);

    const updatedMember: Member = await this.members.findByIdAndUpdate(memberId, { memberData });
    checkEmpty(updatedMember, true);
    logger.info(this._name + 'updateMember.end');
    return updatedMember;
  }

  public async deleteMember(memberId: string): Promise<Member> {
    return this.delete(memberId);
  }
}

export default MemberService;
