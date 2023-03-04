import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserInfoInterface,
  DAOBriefInterface,
  DAOInterface,
  AccessType,
  PermissionInterface,
} from './app.interface';
import { DAODocument, DAO, USERDocument, USER } from './app.schema';
import { findDaoListKeyByTreasuryAddress } from './app.helper';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(DAO.name)
    private daoModel: Model<DAODocument>,
    @InjectModel(USER.name)
    private userModel: Model<USERDocument>,
  ) {}

  async createOrUpdateDAO(
    userAddress: string,
    daoBriefInfo: DAOBriefInterface,
  ): Promise<UserInfoInterface> {
    // check if dao exist
    const existingDao = await this.daoModel.findOne({
      treasuryAddress: daoBriefInfo.treasuryAddress,
    });
    let daoID = '';
    let daoCreationSuccessful = false;
    let daoUpdateSuccessful = false;
    // if dao does exist
    if (existingDao) {
      Logger.log('Dao Exist');
      // if user is actually the admin
      if (existingDao.admin.includes(userAddress)) {
        Logger.log('User is Admin');
        existingDao.name = daoBriefInfo.name;
        existingDao.logoURL = daoBriefInfo.logoURL;
        existingDao.introduction = daoBriefInfo.introduction;
        existingDao.treasuryAddress = daoBriefInfo.treasuryAddress;
        const response = existingDao.save();
        daoID = (await response).id;
        daoUpdateSuccessful = true;
      }
      // user has no access to modify the dao data
      else {
        Logger.log('User is Not Admin');
        daoCreationSuccessful = false;
      }
    }
    // if dao does not exist, create new one
    else {
      Logger.log('Dao Does Not Exist');
      const dao = new this.daoModel({
        name: daoBriefInfo.name,
        logoURL: daoBriefInfo.logoURL,
        introduction: daoBriefInfo.introduction,
        treasuryAddress: daoBriefInfo.treasuryAddress,
        admin: [userAddress],
      });
      const response = dao.save();
      daoID = (await response).id;
      daoCreationSuccessful = true;
    }

    // query for user from database
    const existingUser = await this.userModel.findOne({
      userAddress: userAddress,
    });
    // create dao brief data for user storage
    const daoBrief: DAOBriefInterface = {
      id: daoID,
      logoURL: daoBriefInfo.logoURL,
      name: daoBriefInfo.name,
      introduction: daoBriefInfo.introduction,
      treasuryAddress: daoBriefInfo.treasuryAddress,
      access: AccessType.Admin,
    };
    // update user data
    if (existingUser) {
      Logger.log('User Does Exist');
      // if its dao creation
      if (daoCreationSuccessful) {
        Logger.log('User Exist: Dao Creation Successful');
        existingUser.daoList.push(daoBrief);
        return existingUser.save();
      }
      // if its dao update
      else if (daoUpdateSuccessful) {
        Logger.log('User Exist: Dao Update Successful');
        const index = findDaoListKeyByTreasuryAddress(
          existingUser.daoList,
          daoBriefInfo.treasuryAddress,
        );
        if (index >= 0) {
          Logger.log(
            'User Exist: Dao Update Successful + user does have the dao',
          );
          existingUser.daoList[index] = daoBrief;
        } else {
          Logger.log(
            'User: Dao Update Successful + user does not have the dao',
          );
          existingUser.daoList.push(daoBrief);
        }
        existingUser.save();
        return existingUser;
      }
      // if dao creation or update failed, then return original data;
      else {
        Logger.log('User Exist: Dao Creation and Update Failed');
        return existingUser;
      }
    }
    // create new user data
    else {
      Logger.log('User Does Not Exist');
      if (daoCreationSuccessful) {
        Logger.log('User Not Exist: User Create with Admin Access Successful');
        const newUser = new this.userModel({
          userAddress: userAddress,
          daoList: [daoBrief],
        });
        return newUser.save();
      } else {
        Logger.log('User Not Exist: User Create Successful');
        const newUser = new this.userModel({
          userAddress: userAddress,
        });
        return newUser.save();
      }
    }
  }

  async getUserInfo(userAddress: string): Promise<UserInfoInterface> {
    // query for user from database
    const existingUser = await this.userModel.findOne({
      userAddress: userAddress,
    });
    return existingUser;
  }

  async getDAOPermissionInfo(
    userAddress: string,
    daoID: string,
  ): Promise<Array<PermissionInterface>> {
    const existingDao = await this.daoModel.findOne({
      _id: daoID,
    });
    if (existingDao.admin.includes(userAddress)) {
      const result: Array<PermissionInterface> = [];
      for (let i = 0; i < existingDao.admin.length; i++) {
        result.push({
          userAddress: existingDao.admin[i],
          access: AccessType.Admin,
        });
      }
      for (let i = 0; i < existingDao.subAdmin.length; i++) {
        result.push({
          userAddress: existingDao.subAdmin[i],
          access: AccessType.SubAdmin,
        });
      }
      for (let i = 0; i < existingDao.members.length; i++) {
        result.push({
          userAddress: existingDao.members[i],
          access: AccessType.Member,
        });
      }
      return result;
    } else {
      return null;
    }
  }

  async updateDAOPermission(
    userAddress: string,
    daoID: string,
    permissionArray: Array<PermissionInterface>,
  ): Promise<DAOInterface> {
    const existingDao = await this.daoModel.findOne({
      _id: daoID,
    });
    if (existingDao.admin.includes(userAddress)) {
      for (let i = 0; i < permissionArray.length; i++) {
        if (
          permissionArray[i].access == AccessType.Admin &&
          !existingDao.admin.includes(permissionArray[i].userAddress)
        ) {
          existingDao.admin.push(permissionArray[i].userAddress);
        } else if (
          permissionArray[i].access == AccessType.SubAdmin &&
          !existingDao.subAdmin.includes(permissionArray[i].userAddress)
        ) {
          existingDao.subAdmin.push(permissionArray[i].userAddress);
        } else if (
          permissionArray[i].access == AccessType.Member &&
          !existingDao.members.includes(permissionArray[i].userAddress)
        ) {
          existingDao.members.push(permissionArray[i].userAddress);
        }
      }
    } else {
      return null;
    }
    return existingDao.save();
  }

  async deleteDAOUser(
    userAddress: string,
    daoID: string,
    toDeleteInfo: PermissionInterface,
  ): Promise<DAOInterface> {
    const existingDao = await this.daoModel.findOne({
      _id: daoID,
    });
    if (existingDao.admin.includes(userAddress)) {
      if (
        toDeleteInfo.access == AccessType.Admin &&
        existingDao.admin.length > 1
      ) {
        const index = existingDao.admin.indexOf(toDeleteInfo.userAddress, 0);
        if (index > -1) {
          existingDao.admin.splice(index, 1);
        }
      } else if (toDeleteInfo.access == AccessType.SubAdmin) {
        const index = existingDao.subAdmin.indexOf(toDeleteInfo.userAddress, 0);
        if (index > -1) {
          existingDao.subAdmin.splice(index, 1);
        }
      } else if (toDeleteInfo.access == AccessType.Member) {
        const index = existingDao.members.indexOf(toDeleteInfo.userAddress, 0);
        if (index > -1) {
          existingDao.members.splice(index, 1);
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
    return existingDao.save();
  }
}
