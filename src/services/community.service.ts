import { CommunityModel } from '@/models';
import { CreateCommunityDto } from '@dtos/community.dto';
import { Community } from '@models/community.model';
import { logger } from '@utils/logger';
import { checkEmpty, checkObjectId } from '@utils/util';
import BaseService from '@services/base.service';
import MemberService from './member.service';
import { Member } from '@models/member.model';

class CommunityService extends BaseService<Community> {
  private communities = CommunityModel;
  protected model = CommunityModel;
  protected memberService = new MemberService();

  private readonly _name = CommunityService.name + '.';

  public async findAllCommunity(filter: Partial<CreateCommunityDto> = undefined): Promise<Community[]> {
    return this.communities.find(filter);
  }

  public async findCommunityById(communityId: string): Promise<Community> {
    logger.info(this._name + 'findCommunityById.start');
    checkObjectId(communityId);
    const community: Community = await this.communities.findOne({ _id: communityId });
    checkEmpty(community, true);
    logger.info(this._name + 'findCommunityById.end');
    return community;
  }

  public async createCommunity(communityData: CreateCommunityDto): Promise<Community> {
    logger.info(this._name + 'createCommunity.start');
    checkEmpty(communityData);

    const result: Community = await this.communities.create({ ...communityData });
    logger.info('community created with id', result.id);
    logger.info(this._name + 'createCommunity.end');

    return result;
  }

  public async updateCommunity(communityId: string, communityData: Partial<CreateCommunityDto>): Promise<Community> {
    logger.info(this._name + 'updateCommunity.start');
    checkEmpty(communityData);
    checkObjectId(communityId);

    const result: Community = await this.communities.findByIdAndUpdate(communityId, communityData);
    logger.info(`community with id ${result.id} updated`);
    logger.info(this._name + 'createCommunity.end');

    return result;
  }

  public async joinCommunityWithMember(code: string, member: Member): Promise<boolean> {
    logger.info(this._name + 'joinCommunityWithUser.start');
    let res = true;
    const community = await this.communities.findByCode(code);
    if (community && member) {
      community.members.push(member);
      await community.save().catch(error => {
        logger.error('An error occurred while saving community', error.message);
        res = false;
      });
    } else {
      logger.error(`Community with code ${code} not found in database`);
      res = false;
    }
    logger.info(this._name + 'joinCommunityWithUser.end');
    return res;
  }

  public async joinCommunity(communityCode: string, userId: string): Promise<boolean> {
    logger.info(this._name + 'joinCommunity.start');
    const member = await this.memberService.findMemberByUser(userId);
    const result = await this.joinCommunityWithMember(communityCode, member);
    logger.info(this._name + 'joinCommunity.end');
    return result;
  }

  public async deleteCommunity(communityId: string): Promise<Community> {
    return this.delete(communityId);
  }
}

export default CommunityService;
