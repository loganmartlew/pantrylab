import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
  imports: [DbModule],
})
export class ItemsModule {}
