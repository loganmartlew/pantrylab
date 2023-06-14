import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [MealsController],
  providers: [MealsService],
  exports: [MealsService],
  imports: [DbModule],
})
export class MealsModule {}
