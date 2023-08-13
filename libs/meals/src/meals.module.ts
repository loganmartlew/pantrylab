import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MealHouseholdUserPolicy } from './policies';
import { HouseholdsModule } from '@pantrylab/households';

@Module({
  controllers: [MealsController],
  providers: [MealsService, MealHouseholdUserPolicy],
  exports: [MealsService],
  imports: [HouseholdsModule],
})
export class MealsModule {}