import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users';
import { MealsService } from '../meals.service';
import { HouseholdsService } from '@pantrylab/households/server';

@Injectable()
export class MealHouseholdUserPolicy implements Policy {
  constructor(
    private mealsService: MealsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { mealId, householdId } = req.params;

    const meal = await this.mealsService.findOne(mealId);

    if (!meal) {
      throw new NotFoundException(`Meal with id: ${mealId} not found`);
    }

    if (meal.householdId !== householdId) {
      throw new BadRequestException(
        `Meal with id: ${meal} does not belong to household with id: ${householdId}`
      );
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      meal.householdId
    );

    return userInHousehold;
  }
}
