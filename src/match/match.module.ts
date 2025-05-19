import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [MatchController],
  imports: [DatabaseModule],
  providers: [MatchService],
})
export class MatchModule {}
