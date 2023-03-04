import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserInfoInterface, DAOBriefInterface } from './app.interface';
import { DAOBriefSchema, DAOBriefDocument } from './app.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(DAOBriefDocument.name)
    private daoBriefModel: Model<DAOBriefDocument>,
  ) {}

  async createDAO(daoBriefInfo: DAOBriefInterface): Promise<DAOBriefInterface> {
    const daoBrief = new this.daoBriefModel({
      name: daoBriefInfo.name,
      logoURL: daoBriefInfo.logoURL,
      introduction: daoBriefInfo.introduction,
      treasuryAddress: daoBriefInfo.treasuryAddress,
      _id: new Types.ObjectId(),
    });
    return daoBrief.save();
  }

  async findAll(): Promise<DAOBriefInterface[]> {
    return this.daoBriefModel.find().exec();
  }

  async getUserInfo(): Promise<Array<UserInfoInterface>> {
    // get mongo data base and process into dao brief data structure and return
    return null;
  }
}
