import { Module, forwardRef } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { HouseholdsController } from './households.controller';
import { HouseholdUserPolicy } from './policies';
import { HouseholdOwnerPolicy } from './policies';
import { UsersModule } from '@pantrylab/users/server';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService, HouseholdUserPolicy, HouseholdOwnerPolicy],
  exports: [HouseholdsService],
  imports: [forwardRef(() => UsersModule)],
})
export class HouseholdsModule {}
