import { Policy } from '@pantrylab/auth/server';
import { User } from '@pantrylab/users/interface';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { HouseholdsService } from '../households.service';

@Injectable()
export class HouseholdUserPolicy implements Policy {
  constructor(private householdsService: HouseholdsService) {}

  async checkConditions(user: User, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const householdId = request.params.householdId;

    const householdExists =
      await this.householdsService.checkExists(householdId);

    if (!householdExists) {
      throw new NotFoundException('Household does not exist');
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      householdId,
    );

    if (!userInHousehold) {
      throw new ForbiddenException(
        `Only a user in this household can perform this action`,
      );
    }

    return userInHousehold;
  }
}
