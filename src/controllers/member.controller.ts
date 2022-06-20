import MemberService from '@services/member.service';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { GetMemberDto } from '@dtos/member.dto';
import { Member } from '@models/member.model';

class MemberController {
  private _name = MemberController.name + '.';
  private memberService = new MemberService();

  public getMembers = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'getMembers.end');
    try {
      const filter: GetMemberDto = req.query;
      const members: Member[] = await this.memberService.findAllMember(filter);
      logger.info(this._name + 'getMembers.end');
      res.status(200).json({ data: members, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'getMemberById.start');
    try {
      const memberId: string = req.params.id;
      const member: Member = await this.memberService.findMemberById(memberId);
      logger.info(this._name + 'getMemberById.end');
      res.status(200).json({ data: member, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default MemberController;
