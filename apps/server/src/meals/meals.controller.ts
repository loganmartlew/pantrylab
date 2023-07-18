import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealDto, MealUpdateDto } from './dto/meal.dto';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MealEntity, MealWithItemsEntity } from './entities/meal.entity';
import handleControllerMutation from '../util/handleControllerMutation';
import { HouseholdId } from '../decorators/householdId.decorator';

@Controller('meals')
@ApiTags('meals')
export class MealsController {
  private objectName = 'Meal';

  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @ApiCreatedResponse({ type: MealEntity })
  create(@Body() createMealDto: MealDto) {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  @ApiCreatedResponse({ type: MealEntity, isArray: true })
  @ApiQuery({ name: 'householdId', required: true, type: String })
  findAll(@HouseholdId() householdId: string) {
    return this.mealsService.findAllInHousehold(householdId);
  }

  @Get(':id')
  @ApiCreatedResponse({ type: MealWithItemsEntity })
  async findOne(@Param('id') id: string) {
    const meal = await this.mealsService.findOne(id);

    if (!meal) {
      throw new NotFoundException(`Meal with id: ${id} not found`);
    }

    return meal;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: MealEntity })
  async update(@Param('id') id: string, @Body() updateMealDto: MealUpdateDto) {
    const meal = await handleControllerMutation(
      () => this.mealsService.update(id, updateMealDto),
      { id, objectName: this.objectName }
    );

    return meal;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: MealEntity })
  async remove(@Param('id') id: string) {
    const meal = await handleControllerMutation(
      () => this.mealsService.remove(id),
      { id, objectName: this.objectName }
    );

    return meal;
  }
}
