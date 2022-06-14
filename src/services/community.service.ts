import { CommunityModel } from '@/models';
import { CreateCommunityDto } from '@dtos/community.dto';
import { Community } from '@models/community.model';
import { logger } from '@utils/logger';
import { checkEmpty, checkObjectId } from '@utils/util';
import BaseService from '@services/base.service';

class CommunityService extends BaseService<Community> {
  private communities = CommunityModel;
  protected model = CommunityModel;

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

  public async deleteCommunity(communityId: string): Promise<Community> {
    return this.delete(communityId);
  }
}

export default CommunityService;
