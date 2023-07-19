import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '../../auth/types';
import { UserEntity } from '@pantrylab/users';
import { MealsService } from '../meals.service';
import { HouseholdsService } from '../../households/households.service';

@Injectable()
export class MealHouseholdUserPolicy implements Policy {
  constructor(
    private mealsService: MealsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const mealId = req.params.id;

    if (!mealId || typeof mealId !== 'string') {
      throw new BadRequestException('Meal id is required');
    }

    const meal = await this.mealsService.findOne(mealId);

    if (!meal) {
      throw new NotFoundException(`Meal with id: ${mealId} not found`);
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      meal.householdId
    );

    return userInHousehold;
  }
}
