import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PlannedMealsService } from './plannedMeals.service';
import { PlannedMealDto } from './dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PlannedMealEntity, PlannedMealWithMealEntity } from './entities';
import { handleControllerMutation } from '@pantrylab/shared/util';
import { HouseholdId } from '@pantrylab/households';
import { HouseholdUserPolicy } from '@pantrylab/households';
import { HouseholdBodyGuard, HouseholdQueryGuard } from '@pantrylab/households';
import { Auth } from '@pantrylab/auth';
import { PlannedMealHouseholdUserPolicy } from './policies';

@Controller('plannedMeals')
@ApiTags('plannedMeals')
export class PlannedMealsController {
  private objectName = 'PlannedMeal';

  constructor(private readonly plannedMealsService: PlannedMealsService) {}

  @Post()
  @Auth([HouseholdBodyGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: PlannedMealEntity })
  create(@Body() createPlannedMealDto: PlannedMealDto) {
    return this.plannedMealsService.create(createPlannedMealDto);
  }

  @Get()
  @Auth([HouseholdQueryGuard], HouseholdUserPolicy)
  @ApiCreatedResponse({ type: PlannedMealWithMealEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAll(@HouseholdId() householdId: string) {
    return this.plannedMealsService.findAllInHousehold(householdId);
  }

  @Get(':id')
  @Auth([], PlannedMealHouseholdUserPolicy)
  @ApiCreatedResponse({ type: PlannedMealWithMealEntity })
  async findOne(@Param('id') id: string) {
    const plannedMeal = await this.plannedMealsService.findOne(id);

    if (!plannedMeal) {
      throw new NotFoundException(`PlannedMeal with id: ${id} not found`);
    }

    return plannedMeal;
  }

  @Delete(':id')
  @Auth([], PlannedMealHouseholdUserPolicy)
  @ApiCreatedResponse({ type: PlannedMealEntity })
  async remove(@Param('id') id: string) {
    const plannedMeal = await handleControllerMutation(
      () => this.plannedMealsService.remove(id),
      { id, objectName: this.objectName }
    );

    return plannedMeal;
  }
}
