import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { UserInfoInterface, DAOBriefInterface } from './app.interface';
import mongoose from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:address/')
  async getUserInfoInterface(
    @Param() params,
  ): Promise<Array<UserInfoInterface>> {
    Logger.log('address: ' + params.address);
    return this.appService.getUserInfo();
  }

  @Post(':address/create-dao')
  async createNew(
    @Param() params,
    @Body() daoInfo: DAOBriefInterface,
  ): Promise<string> {
    const object = await this.appService.createDAO(daoInfo);
    return object.toString();
  }
}
