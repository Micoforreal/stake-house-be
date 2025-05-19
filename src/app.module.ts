import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './match/match.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,expandVariables:true}),MatchModule, DatabaseModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
