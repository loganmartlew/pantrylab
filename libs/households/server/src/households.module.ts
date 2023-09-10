import { UsersModule } from '@pantrylab/users/server';
import { forwardRef, Module } from '@nestjs/common';
import { HouseholdsController } from './households.controller';
import { HouseholdsService } from './households.service';
import { HouseholdOwnerPolicy, HouseholdUserPolicy } from './policies';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdUserPolicy, HouseholdOwnerPolicy],
  exports: [HouseholdsService],
  imports: [forwardRef(() => UsersModule)],
})
export class HouseholdsModule {}
