import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { HouseholdsModule } from '../households/households.module';
import { ItemHouseholdUserPolicy } from './policies';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, ItemHouseholdUserPolicy],
  exports: [ItemsService],
  imports: [HouseholdsModule],
})
export class ItemsModule {}
