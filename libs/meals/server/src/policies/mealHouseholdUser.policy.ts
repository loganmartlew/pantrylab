import { Policy } from '@pantrylab/auth/server';
import { HouseholdsService } from '@pantrylab/households/server';
import { User } from '@pantrylab/users/interface';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MealsService } from '../meals.service';

@Injectable()
export class MealHouseholdUserPolicy implements Policy {
  constructor(
    private mealsService: MealsService,
    private householdsService: HouseholdsService,
  ) {}

  async checkConditions(user: User, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { mealId, householdId } = req.params;

    const meal = await this.mealsService.findOne(mealId);

    if (!meal) {
      throw new NotFoundException(`Meal with id: ${mealId} not found`);
    }

    if (meal.householdId !== householdId) {
      throw new BadRequestException(
        `Meal with id: ${meal} does not belong to household with id: ${householdId}`,
      );
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      meal.householdId,
    );

    return userInHousehold;
  }
}
