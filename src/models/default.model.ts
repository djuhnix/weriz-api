import { defaultClasses, plugin } from '@typegoose/typegoose';
import findOrCreate from 'mongoose-findorcreate';
import autoPopulate from 'mongoose-autopopulate';

@plugin(autoPopulate)
@plugin(findOrCreate)
class DefaultModel extends defaultClasses.FindOrCreate {
  public createdAt?: Date;
  public updatedAt?: Date;
}

export default DefaultModel;
