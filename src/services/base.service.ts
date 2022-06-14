import { Models } from '@/models';
import { checkEmpty, checkObjectId } from '@utils/util';
import { logger } from '@utils/logger';
// import { getName } from '@typegoose/typegoose';

abstract class BaseService<T> {
  protected model: Models;

  protected async delete(id: string): Promise<T> {
    logger.info(this.model.name + 'Service.' + 'delete.start');
    checkObjectId(id);
    const deletedElement: T = await this.model.findByIdAndDelete(id);
    checkEmpty(deletedElement, true);
    logger.info(this.model.name + 'Service.' + 'delete.end');
    return deletedElement;
  }
}

export default BaseService;
