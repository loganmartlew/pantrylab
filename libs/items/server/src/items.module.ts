import { HouseholdsModule } from '@pantrylab/households/server';
import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { ItemHouseholdUserPolicy } from './policies';
import { ItemHouseholdPolicy } from './policies/itemHousehold.policy';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemHouseholdUserPolicy, ItemHouseholdPolicy],
  exports: [ItemsService],
  imports: [HouseholdsModule],
})
export class ItemsModule {}
