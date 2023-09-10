import { Injectable } from '@nestjs/common';
import { PlannedMealDto, PlannedMealUpdateDto } from './dto';
import { DbService } from '@pantrylab/db';

@Injectable()
export class PlannedMealsService {
  constructor(private db: DbService) {}

  async checkExists(id: string) {
    const plannedMeal = await this.db.plannedMeal.findUnique({
      where: { id },
    });
    return !!plannedMeal;
  }

  async create(plannedMealDto: PlannedMealDto) {
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

  async update(id: string, updatePlannedMealDto: PlannedMealUpdateDto) {
    const plannedMeal = await this.db.plannedMeal.update({
      where: { id },
      data: updatePlannedMealDto,
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
