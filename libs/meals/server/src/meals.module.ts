import { HouseholdsModule } from '@pantrylab/households/server';
import { ItemsModule } from '@pantrylab/items/server';
import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { MealHouseholdUserPolicy } from './policies';

@Module({
  controllers: [MealsController],
  providers: [MealsService, MealHouseholdUserPolicy],
  exports: [MealsService],
  imports: [HouseholdsModule, ItemsModule],
})
export class MealsModule {}
