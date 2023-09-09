import { Module } from '@nestjs/common';
import { ListItemsService } from './listItems.service';
import { ListItemsController } from './listItems.controller';
import { HouseholdsModule } from '@pantrylab/households/server';
import { ItemsModule } from '@pantrylab/items/server';
import { ListItemHouseholdUserPolicy } from './policies';

@Module({
  controllers: [ListItemsController],
  providers: [ListItemsService, ListItemHouseholdUserPolicy],
  exports: [ListItemsService],
  imports: [HouseholdsModule, ItemsModule],
})
export class ListItemsModule {}
