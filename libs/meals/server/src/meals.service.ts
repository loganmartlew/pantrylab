import { Injectable } from '@nestjs/common';
import { MealUpdateDto } from './dto';
import { DbService } from '@pantrylab/db';
import { MealCreate } from '@pantrylab/meals/interface';

@Injectable()
export class MealsService {
  constructor(private db: DbService) {}

  async checkExists(id: string) {
    const meal = await this.db.meal.findUnique({
      where: { id },
    });
    return !!meal;
  }

  async create(mealDto: MealCreate) {
    const { itemIds, ...omittedDto } = mealDto;

    const meal = await this.db.meal.create({
      data: {
        ...omittedDto,
        items: {
          connect: itemIds?.map((item) => ({ id: item })) || [],
        },
      },
    });
    return meal;
  }

  async findAll() {
    const meals = await this.db.meal.findMany();
    return meals;
  }

  async findAllInHousehold(householdId: string) {
    const meals = await this.db.meal.findMany({
      where: { householdId },
    });
    return meals;
  }

  async findOne(id: string) {
    const meal = await this.db.meal.findUnique({
      where: { id },
      include: { items: true },
    });
    return meal;
  }

  async update(id: string, updateMealDto: MealUpdateDto) {
    const { itemIds, ...omittedDto } = updateMealDto;

    const meal = await this.db.meal.update({
      where: { id },
      data: {
        ...omittedDto,
        items: {
          set: itemIds?.map((item) => ({ id: item })) || [],
        },
      },
    });
    return meal;
  }

  async remove(id: string) {
    const meal = await this.db.meal.delete({
      where: { id },
    });
    return meal;
  }
}
