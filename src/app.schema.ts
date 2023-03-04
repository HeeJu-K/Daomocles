import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DAOBrief {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logoURL: string;

  @Prop({ required: true })
  introduction: string;

  @Prop({ required: true })
  treasuryAddress: string;
}

export type DAOBriefDocument = DAOBrief & Document;
export const DAOBriefSchema = SchemaFactory.createForClass(DAOBrief);
