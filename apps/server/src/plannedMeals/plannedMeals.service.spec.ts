import { Test, TestingModule } from '@nestjs/testing';
import { PlannedMealsService } from './plannedMeals.service';

describe('PlannedMealsService', () => {
  let service: PlannedMealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlannedMealsService],
    }).compile();

    service = module.get<PlannedMealsService>(PlannedMealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
