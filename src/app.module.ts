import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DAO,
  DAOSchema,
  DAOBrief,
  DAOBriefSchema,
  USER,
  USERSchema,
} from './app.schema';
import { config } from 'dotenv';
config(); // load environment variables

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: DAO.name, schema: DAOSchema },
      { name: USER.name, schema: USERSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true, // optional
      envFilePath: ['.env'], // optional
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
