import { Module } from '@nestjs/common';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealsController } from './plannedMeals.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [PlannedMealsController],
  providers: [PlannedMealsService],
  exports: [PlannedMealsService],
  imports: [DbModule],
})
export class PlannedMealsModule {}
