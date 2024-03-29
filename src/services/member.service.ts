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
    logger.info('member found', member.id);
    checkEmpty(member);

    logger.info(this._name + 'findMemberById.end');
    return member;
  }

  public async findMemberByEmail(memberEmail: string): Promise<Member> {
    logger.info(this._name + 'findMemberByEmail.start');

    const member: Member = await this.members.findOne({ email: memberEmail });
    checkEmpty(member);
    if (member) logger.info('member found', { id: member.id });

    logger.info(this._name + 'findMemberByEmail.end');
    return member;
  }

  public async findMemberByUser(userId: string): Promise<Member> {
    logger.info(this._name + 'findMemberByUser.start');

    logger.info('user id', userId);
    const member: Member = await this.members.findByUser(userId);
    logger.info('member found', member.id);
    checkEmpty(member);

    logger.info(this._name + 'findMemberByUser.end');
    return member;
  }

  public async createMember(memberData: CreateMemberDto): Promise<Member> {
    logger.info(this._name + 'createMember.start');
    checkEmpty(memberData);
    checkObjectId(memberData.userId);

    const result = await this.members.findOrCreate({
      firstname: memberData.firstname,
      lastname: memberData.lastname,
      email: memberData.email,
      user: { _id: memberData.userId },
    });
    const member: Member = result.doc;

    logger.info(`member ${result.created ? 'created' : 'found'}`, { email: member.email });
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
