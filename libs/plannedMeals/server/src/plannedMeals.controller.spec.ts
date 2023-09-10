import { Test, TestingModule } from '@nestjs/testing';
import { PlannedMealsController } from './plannedMeals.controller';
import { PlannedMealsService } from './plannedMeals.service';

describe('PlannedMealsController', () => {
  let controller: PlannedMealsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlannedMealsController],
      providers: [PlannedMealsService],
    }).compile();

    controller = module.get<PlannedMealsController>(PlannedMealsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
