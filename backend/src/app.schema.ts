import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TokenInterface, DAOBriefInterface } from './app.interface';

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

@Schema()
export class DAO {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logoURL: string;

  @Prop({ required: true })
  introduction: string;

  @Prop({ required: true, unique: true })
  treasuryAddress: string;

  @Prop({ required: true })
  admin: Array<string>;

  @Prop({ required: true })
  subAdmin: Array<string>;

  @Prop({ required: true })
  members: Array<string>;

  @Prop({ required: true })
  tokens: Array<TokenInterface>;
}

export type DAODocument = DAO & Document;
export const DAOSchema = SchemaFactory.createForClass(DAO);

@Schema()
export class USER {
  @Prop({ required: true, unique: true })
  userAddress: string;

  @Prop({ required: true })
  daoList: Array<DAOBriefInterface>;
}

export type USERDocument = USER & Document;
export const USERSchema = SchemaFactory.createForClass(USER);
