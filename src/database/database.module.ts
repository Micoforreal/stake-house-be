import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient, Db } from 'mongodb';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';


const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<Db> => {'';
     const uri = configService.get<string>('MONGO_URI') || "";
     const DATABASE_NAME = 'stake_house';  
      
     const client = await MongoClient.connect(uri);
    return client.db(DATABASE_NAME);
  },
};




@Module({
  providers: [databaseProvider],
  exports:['DATABASE_CONNECTION'],
 
})
export class DatabaseModule {}
