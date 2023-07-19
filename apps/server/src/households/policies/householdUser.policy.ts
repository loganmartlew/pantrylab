import { ExecutionContext, Injectable } from '@nestjs/common';
import { Policy } from '../../auth/types';
import { UserEntity } from '../../users/entities/user.entity';
import { HouseholdsService } from '../households.service';
import { Reflector } from '@nestjs/core';
import { householdIdMetadataKey } from '../meta';

@Injectable()
export class HouseholdUserPolicy implements Policy {
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
      householdId
    );

    return userInHousehold;
  }
}
