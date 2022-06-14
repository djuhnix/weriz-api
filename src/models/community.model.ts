import { prop, modelOptions, DocumentType, Ref, ReturnModelType } from '@typegoose/typegoose';
import { generateCommunityCode } from '@utils/util';
import { Member } from '@models/member.model';
import DefaultModel from '@models/default.model';

@modelOptions({ schemaOptions: { collection: 'communities' } })
class Community extends DefaultModel {
  @prop({ type: String, required: true })
  public name: string;

  @prop({
    type: String,
    required: true,
    unique: true,
    default: function (this: DocumentType<Community>) {
      return generateCommunityCode(this.name);
    },
  })
  public code?: string;

  @prop({ ref: () => Member, required: true, default: [] })
  public members: Ref<Member>[];

  public static async findByCode(this: ReturnModelType<typeof Community>, code: string) {
    return this.findOne({ code: code }).exec();
  }
}

// const CommunityModel = getModelForClass(Community);

export {
  Community,
  // CommunityModel,
};
