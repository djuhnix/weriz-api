import { defaultClasses, modelOptions, plugin } from '@typegoose/typegoose';
import findOrCreate from 'mongoose-findorcreate';
import autoPopulate from 'mongoose-autopopulate';

// have the interface to add the types of "Base" to the class
// because Typescript & JavaScript don't have functions for multiple inheritance
interface DefaultModel extends defaultClasses.Base {
  createdAt?: Date;
  updatedAt?: Date;
}

@plugin(autoPopulate)
@plugin(findOrCreate)
@modelOptions({ schemaOptions: { timestamps: true } })
class DefaultModel extends defaultClasses.FindOrCreate {}

export default DefaultModel;
