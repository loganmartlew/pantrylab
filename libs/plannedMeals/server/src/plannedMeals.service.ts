import { DbService } from '@pantrylab/db';
import { PlannedMealCreate } from '@pantrylab/plannedMeals/interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlannedMealsService {
  constructor(private db: DbService) {}

  async checkExists(id: string) {
    const plannedMeal = await this.db.plannedMeal.findUnique({
      where: { id },
    });
    return !!plannedMeal;
  }

  async create(plannedMealDto: PlannedMealCreate) {
    const plannedMeal = await this.db.plannedMeal.create({
      data: plannedMealDto,
    });
    return plannedMeal;
  }

  async findAll() {
    const plannedMeals = await this.db.plannedMeal.findMany();
    return plannedMeals;
  }

  async findAllInHousehold(householdId: string) {
    const plannedMeals = await this.db.plannedMeal.findMany({
      where: { householdId },
      include: { meal: true },
    });
    return plannedMeals;
  }

  async findOne(id: string) {
    const plannedMeal = await this.db.plannedMeal.findUnique({
      where: { id },
      include: { meal: true },
    });
    return plannedMeal;
  }

  async remove(id: string) {
    const plannedMeal = await this.db.plannedMeal.delete({
      where: { id },
    });
    return plannedMeal;
  }
}
