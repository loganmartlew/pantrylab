import { Module } from '@nestjs/common';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealsController } from './plannedMeals.controller';
import { PlannedMealHouseholdUserPolicy } from './policies';
import { HouseholdsModule } from '@pantrylab/households';

@Module({
  controllers: [PlannedMealsController],
  providers: [PlannedMealsService, PlannedMealHouseholdUserPolicy],
  exports: [PlannedMealsService],
  imports: [HouseholdsModule],
})
export class PlannedMealsModule {}
