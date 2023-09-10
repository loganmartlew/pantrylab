import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { UserEntity } from '@pantrylab/users/server';
import { PlannedMealsService } from '../plannedMeals.service';
import { HouseholdsService } from '@pantrylab/households/server';

@Injectable()
export class PlannedMealHouseholdUserPolicy implements Policy {
  constructor(
    private plannedMealsService: PlannedMealsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const plannedMealId = req.params.id;

    if (!plannedMealId || typeof plannedMealId !== 'string') {
      throw new BadRequestException('Planned meal id is required');
    }

    const plannedMeal = await this.plannedMealsService.findOne(plannedMealId);

    if (!plannedMeal) {
      throw new NotFoundException(
        `Planned meal with id: ${plannedMealId} not found`
      );
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      plannedMeal.householdId
    );

    return userInHousehold;
  }
}
