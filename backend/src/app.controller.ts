import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Logger,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { AppService } from './app.service';
import {
  UserInfoInterface,
  DAOBriefInterface,
  PermissionInterface,
  TokenInterface,
  TableEntryInterface,
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

  @Get(':address/:daoID/permission')
  async getDAOPermission(@Param() params): Promise<Array<PermissionInterface>> {
    Logger.log('get dao/permission/');
    return await this.appService.getDAOPermissionInfo(
      params.address,
      params.daoID,
    );
  }

  @Post(':address/:daoID/permission')
  async newDAOPermission(
    @Param() params,
    @Body() permissionArray: Array<PermissionInterface>,
  ): Promise<Array<PermissionInterface>> {
    Logger.log('post /dao/permission');
    return await this.appService.newDAOPermission(
      params.address,
      params.daoID,
      permissionArray,
    );
  }

  @Post(':address/:daoID/permission/batch')
  @UseInterceptors(FileInterceptor('file'))
  async newDAOPermissionViaFile(
    @Param() params,
    @UploadedFile() file: Multer.File,
  ): Promise<Array<PermissionInterface>> {
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

  @Post(':address/:daoID/permission/update')
  async updateDAOPermission(
    @Param() params,
    @Body() permissionArray: Array<PermissionInterface>,
  ): Promise<Array<PermissionInterface>> {
    Logger.log('post dao/permission/update');
    return await this.appService.updateDAOPermission(
      params.address,
      params.daoID,
      permissionArray[0],
    );
  }

  @Post(':address/:daoID/permission/delete')
  async deleteDAOPermission(
    @Param() params,
    @Body() permissionArray: Array<PermissionInterface>,
  ): Promise<Array<PermissionInterface>> {
    Logger.log('post dao/permission/delete');
    return await this.appService.deleteDAOUser(
      params.address,
      params.daoID,
      permissionArray[0],
    );
  }

  @Get(':address/:daoID/token')
  async getTokenList(@Param() params): Promise<Array<TokenInterface>> {
    Logger.log('get dao/token');
    return await this.appService.getTokenList(params.address, params.daoID);
  }

  @Get(':address/:daoID/token/info')
  async getTokenInfo(
    @Param() params,
    @Query('tokenAddress') tokenAddress: string,
    @Query('tokenNetwork') tokenNetwork: number,
  ): Promise<TokenInterface> {
    Logger.log('get dao/token/info');
    return await this.appService.getTokenInfo(tokenAddress, tokenNetwork);
  }

  @Post(':address/:daoID/token/new')
  async newToken(
    @Param() params,
    @Body() newToken: TokenInterface,
  ): Promise<Array<TokenInterface>> {
    Logger.log('post dao/token/new');
    return await this.appService.addToken(
      params.address,
      params.daoID,
      newToken,
    );
  }

  @Post(':address/:daoID/token/delete')
  async removeToken(
    @Param() params,
    @Body() deleteToken: TokenInterface,
  ): Promise<Array<TokenInterface>> {
    Logger.log('post dao/token/delete');
    return await this.appService.removeToken(
      params.address,
      params.daoID,
      deleteToken,
    );
  }

  @Get(':address/:daoID/:daoContractAddress/transactions/incoming')
  async getIncomingTransactions(
    @Param() params,
  ): Promise<Array<TableEntryInterface>> {
    Logger.log('get dao/transactions/incoming');
    return this.appService.getIncomingTransactions(
      params.daoID,
      params.daoContractAddress,
    );
  }
}
