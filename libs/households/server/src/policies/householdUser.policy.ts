import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users/server';
import { HouseholdsService } from '../households.service';
import { Request } from 'express';

@Injectable()
export class HouseholdUserPolicy implements Policy {
  constructor(private householdsService: HouseholdsService) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const householdId = request.params.householdId;

    const householdExists = await this.householdsService.checkExists(
      householdId
    );

    if (!householdExists) {
      throw new NotFoundException('Household does not exist');
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      householdId
    );

    if (!userInHousehold) {
      throw new ForbiddenException(
        `Only a user in this household can perform this action`
      );
    }

    return userInHousehold;
  }
}
