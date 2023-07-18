import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { HouseholdsModule } from '../households/households.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
  imports: [HouseholdsModule],
})
export class ItemsModule {}
