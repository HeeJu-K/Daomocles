import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class DAOBriefDocument extends Document {
  @Prop()
  logoURL: string;

  @Prop()
  name: string;

  @Prop()
  introduction: string;

  @Prop()
  treasuryAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;
}

export const DAOBriefSchema = SchemaFactory.createForClass(DAOBriefDocument);
