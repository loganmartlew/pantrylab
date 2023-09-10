import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { User } from '@pantrylab/users/interface';
import { HouseholdsService } from '../households.service';
import { Request } from 'express';

@Injectable()
export class HouseholdOwnerPolicy implements Policy {
  constructor(private householdsService: HouseholdsService) {}

  async checkConditions(user: User, context: ExecutionContext) {
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
      householdId,
      'OWNER'
    );

    if (!userInHousehold) {
      throw new ForbiddenException(
        `Only the household owner can perform this action`
      );
    }

    return userInHousehold;
  }
}
