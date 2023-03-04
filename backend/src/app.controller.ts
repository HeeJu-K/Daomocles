import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Logger,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { AppService } from './app.service';
import {
  UserInfoInterface,
  DAOBriefInterface,
  PermissionInterface,
  DAOInterface,
} from './app.interface';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:address/')
  async getUserInfoInterface(@Param() params): Promise<UserInfoInterface> {
    Logger.log('get /getUserInfoInterface');
    return await this.appService.getUserInfo(params.address);
  }

  @Post(':address/create-dao')
  async createDAO(
    @Param() params,
    @Body() daoInfo: DAOBriefInterface,
  ): Promise<UserInfoInterface> {
    Logger.log('post /createNew');
    return await this.appService.createOrUpdateDAO(params.address, daoInfo);
  }

  @Post(':address/:daoID/profile')
  async updateDAOProfile(
    @Param() params,
    @Body() daoInfo: DAOBriefInterface,
  ): Promise<UserInfoInterface> {
    Logger.log('post /profile');
    return await this.appService.createOrUpdateDAO(params.address, daoInfo);
  }

  @Post(':address/:daoID/permission')
  async updateDAOPermission(
    @Param() params,
    @Body() permissionArray: Array<PermissionInterface>,
  ): Promise<DAOInterface> {
    Logger.log('post /dao/permission');
    return await this.appService.newDAOPermission(
      params.address,
      params.daoID,
      permissionArray,
    );
  }

  @Post(':address/:daoID/permission/batch')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param() params,
    @UploadedFile() file: Multer.File,
  ): Promise<any> {
    Logger.log('post /dao/permission/batch');
    // Use the csv-parser package to parse the file data
    const csvFile = readFileSync(file.path);
    const csvData = csvFile.toString();
    const parsedCSV = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformerHeader: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    return await this.appService.newDAOPermission(
      params.address,
      params.daoID,
      parsedCSV.data,
    );
  }

  @Post(':address/:daoID/permission/delete')
  async deleteDAOPermission(
    @Param() params,
    @Body() permission: PermissionInterface,
  ): Promise<DAOInterface> {
    Logger.log('post dao/permission/delete');
    return await this.appService.deleteDAOUser(
      params.address,
      params.daoID,
      permission,
    );
  }

  @Get(':address/:daoID/permission')
  async getDAOPermission(@Param() params): Promise<Array<PermissionInterface>> {
    Logger.log('get dao/permission/');
    return await this.appService.getDAOPermissionInfo(
      params.address,
      params.daoID,
    );
  }
}
