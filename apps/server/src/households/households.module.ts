import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService],
  exports: [HouseholdsService],
  imports: [DbModule],
})
export class HouseholdsModule {}
