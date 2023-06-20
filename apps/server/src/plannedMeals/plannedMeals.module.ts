import { Module } from '@nestjs/common';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealsController } from './plannedMeals.controller';

@Module({
  controllers: [PlannedMealsController],
  providers: [PlannedMealsService],
  exports: [PlannedMealsService],
})
export class PlannedMealsModule {}
