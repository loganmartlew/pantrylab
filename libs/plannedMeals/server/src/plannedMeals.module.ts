import { HouseholdsModule } from '@pantrylab/households/server';
import { Module } from '@nestjs/common';
import { PlannedMealsController } from './plannedMeals.controller';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealHouseholdUserPolicy } from './policies';

@Module({
  controllers: [PlannedMealsController],
  providers: [PlannedMealsService, PlannedMealHouseholdUserPolicy],
  exports: [PlannedMealsService],
  imports: [HouseholdsModule],
})
export class PlannedMealsModule {}
