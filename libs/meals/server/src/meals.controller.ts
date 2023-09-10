import { Controller } from '@nestjs/common';
import { MealsService } from './meals.service';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import {
  HouseholdId,
  HouseholdUserPolicy,
  HouseholdParamGuard,
} from '@pantrylab/households/server';
import { Auth } from '@pantrylab/auth/server';
import { MealHouseholdUserPolicy } from './policies';
import { Meal, mealsContract as c } from '@pantrylab/meals/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { MealItemsHouseholdGuard } from './guards';

@Controller()
@TsRest({ validateResponses: true })
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @TsRestHandler(c.createMeal)
  @Auth([HouseholdParamGuard, MealItemsHouseholdGuard], HouseholdUserPolicy)
  createMeal() {
    return tsRestHandler(c.createMeal, async ({ body }) => {
      const meal: Meal = await this.mealsService.create(body);
      return { status: 201 as const, body: meal };
    });
  }

  @TsRestHandler(c.findHouseholdMeals)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  findHouseholdMeals(@HouseholdId() householdId: string) {
    return tsRestHandler(c.findHouseholdMeals, async () => {
      const meals: Meal[] = await this.mealsService.findAllInHousehold(
        householdId
      );
      return { status: 200 as const, body: meals };
    });
  }

  @TsRestHandler(c.findHouseholdMeal)
  @Auth([HouseholdParamGuard], MealHouseholdUserPolicy)
  async findHouseholdMeal() {
    return tsRestHandler(
      c.findHouseholdMeal,
      async ({ params: { mealId } }) => {
        const meal = await this.mealsService.findOne(mealId);

        if (!meal) {
          return createTsRestErrorResponse<404>(
            404,
            `Meal with id: ${mealId} not found`
          );
        }

        return { status: 200 as const, body: meal };
      }
    );
  }

  @TsRestHandler(c.updateHouseholdMeal)
  @Auth([HouseholdParamGuard, MealItemsHouseholdGuard], MealHouseholdUserPolicy)
  async updateHouseholdMeal() {
    return tsRestHandler(
      c.updateHouseholdMeal,
      async ({ params: { mealId }, body }) => {
        const meal = await this.mealsService.update(mealId, body);

        if (!meal) {
          return createTsRestErrorResponse<404>(
            404,
            `Meal with id: ${mealId} not found`
          );
        }

        return { status: 200 as const, body: meal };
      }
    );
  }

  @TsRestHandler(c.deleteHouseholdMeal)
  @Auth([HouseholdParamGuard], MealHouseholdUserPolicy)
  async deleteHouseholdMeal() {
    return tsRestHandler(
      c.deleteHouseholdMeal,
      async ({ params: { mealId } }) => {
        const meal = await this.mealsService.remove(mealId);

        if (!meal) {
          return createTsRestErrorResponse<404>(
            404,
            `Meal with id: ${mealId} not found`
          );
        }

        return { status: 200 as const, body: meal };
      }
    );
  }
}
