import { Auth } from '@pantrylab/auth/server';
import {
  HouseholdBodyMatchParamGuard,
  HouseholdParamGuard,
  HouseholdUserPolicy,
} from '@pantrylab/households/server';
import { MealHouseholdUserPolicy } from '@pantrylab/meals/server';
import {
  plannedMealsContract as c,
  PlannedMeal,
} from '@pantrylab/plannedMeals/interface';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealHouseholdUserPolicy } from './policies';

@Controller()
@TsRest({ validateResponses: true })
export class PlannedMealsController {
  constructor(private readonly plannedMealsService: PlannedMealsService) {}

  @TsRestHandler(c.createPlannedMeal)
  @Auth(
    [HouseholdParamGuard, HouseholdBodyMatchParamGuard],
    MealHouseholdUserPolicy,
  )
  createPlannedMeal() {
    return tsRestHandler(c.createPlannedMeal, async ({ body }) => {
      const plannedMeal: PlannedMeal =
        await this.plannedMealsService.create(body);
      return { status: 201 as const, body: plannedMeal };
    });
  }

  @TsRestHandler(c.findHouseholdPlannedMeals)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  findHouseholdPlannedMeals() {
    return tsRestHandler(
      c.findHouseholdPlannedMeals,
      async ({ params: { householdId } }) => {
        const plannedMeals: PlannedMeal[] =
          await this.plannedMealsService.findAllInHousehold(householdId);
        return { status: 200 as const, body: plannedMeals };
      },
    );
  }

  @TsRestHandler(c.deleteHouseholdPlannedMeal)
  @Auth([HouseholdParamGuard], PlannedMealHouseholdUserPolicy)
  async deleteHouseholdPlannedMeal() {
    return tsRestHandler(
      c.deleteHouseholdPlannedMeal,
      async ({ params: { plannedMealId } }) => {
        const plannedMeal =
          await this.plannedMealsService.remove(plannedMealId);

        if (!plannedMeal) {
          return createTsRestErrorResponse<404>(
            404,
            `Planned meal with id: ${plannedMeal} not found`,
          );
        }

        return { status: 200 as const, body: plannedMeal };
      },
    );
  }
}
