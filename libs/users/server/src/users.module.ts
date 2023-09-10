import { HouseholdsModule } from '@pantrylab/households/server';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => HouseholdsModule)],
})
export class UsersModule {}
