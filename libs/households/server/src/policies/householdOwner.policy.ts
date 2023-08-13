import { ExecutionContext, Injectable } from '@nestjs/common';
import { Policy } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users';
import { HouseholdsService } from '../households.service';
import { Reflector } from '@nestjs/core';
import { householdIdMetadataKey } from '../meta';

@Injectable()
export class HouseholdOwnerPolicy implements Policy {
  constructor(
    private householdsService: HouseholdsService,
    private reflector: Reflector
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const householdId = this.reflector.get<string>(
      householdIdMetadataKey,
      context.getHandler()
    );

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      householdId,
      'OWNER'
    );

    return userInHousehold;
  }
}
