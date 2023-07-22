import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { HouseholdUserPolicy } from './policies';
import { HouseholdOwnerPolicy } from './policies';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdUserPolicy, HouseholdOwnerPolicy],
  exports: [HouseholdsService],
})
export class HouseholdsModule {}
