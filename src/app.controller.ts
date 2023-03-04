import { Controller, Get, Post, Param, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { UserInfoInterface, DAOBriefInterface } from './app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:address/')
  async getUserInfoInterface(@Param() params): Promise<UserInfoInterface> {
    Logger.log('/getUserInfoInterface');
    return await this.appService.getUserInfo();
  }

  @Post(':address/create-dao')
  async createNew(
    @Param() params,
    @Body() daoInfo: DAOBriefInterface,
  ): Promise<UserInfoInterface> {
    Logger.log('/createNew');
    return await this.appService.createOrUpdateDAO(params.address, daoInfo);
  }
}
