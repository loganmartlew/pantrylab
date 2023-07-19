import { Module } from '@nestjs/common';
import { ListItemsService } from './listItems.service';
import { ListItemsController } from './listItems.controller';
import { HouseholdsModule } from '../households/households.module';
import { ItemsModule } from '../items/items.module';
import { ListItemHouseholdUserPolicy } from './policies';

@Module({
  controllers: [ListItemsController],
  providers: [ListItemsService, ListItemHouseholdUserPolicy],
  exports: [ListItemsService],
  imports: [HouseholdsModule, ItemsModule],
})
export class ListItemsModule {}
