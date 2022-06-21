import CommunityService from '@services/community.service';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import { CreateCommunityDto, GetCommunityDto } from '@dtos/community.dto';
import { Community } from '@models/community.model';
import { RequestWithUser } from '../interfaces/auth.interface';
import communityService from '@services/community.service';
import { Member } from '../models/member.model';
import { Ref } from '@typegoose/typegoose';

class CommunityController {
  private _name = CommunityController.name + '.';
  private communityService = new CommunityService();

  public getCommunities = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'getCommunities.start');
    try {
      const filter: GetCommunityDto = req.query;
      const community: Community[] = await this.communityService.findAllCommunity(filter);
      logger.info(this._name + 'getCommunities.end');
      res.status(200).json({ data: community, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommunityById = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'getCommunityById.start');
    try {
      const communityId: string = req.params.id;
      const community: Community = await this.communityService.findCommunityById(communityId);
      logger.info(this._name + 'getCommunityById.end');
      res.status(200).json({ data: community, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'createCommunity.start');
    try {
      const communityData: CreateCommunityDto = req.body;
      const newCommunity: Community = await this.communityService.createCommunity(communityData);
      logger.info(this._name + 'createCommunity.end');
      res.status(201).json({ data: newCommunity, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCommunity = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(this._name + 'updateCommunity.start');
    try {
      const communityId: string = req.params.id;
      const communityData: CreateCommunityDto = req.body;
      const updatedCommunity: Community = await this.communityService.updateCommunity(communityId, communityData);
      logger.info(this._name + 'updateCommunity.end');
      res.status(201).json({ data: updatedCommunity, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public joinCommunity = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    logger.info(this._name + 'joinCommunity.start');
    try {
      const communityCode: string = req.params.code;
      const result = await this.communityService.joinCommunity(communityCode, req.user.id);
      res.status(200).json({ data: result, message: 'joined' });
    } catch (error) {
      next(error);
    }
    logger.info(this._name + 'joinCommunity.end');
  };
}
export default CommunityController;
