import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { User } from '@pantrylab/users/interface';
import { ListItemsService } from '../listItems.service';
import { HouseholdsService } from '@pantrylab/households/server';

@Injectable()
export class ListItemHouseholdUserPolicy implements Policy {
  constructor(
    private listItemsService: ListItemsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: User, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { listItemId, householdId } = req.params;

    const listItem = await this.listItemsService.findOne(listItemId);

    if (!listItem) {
      throw new NotFoundException(`List item with id: ${listItemId} not found`);
    }

    if (listItem.householdId !== householdId) {
      throw new BadRequestException(
        `List item with id: ${listItem} does not belong to household with id: ${householdId}`
      );
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      listItem.householdId
    );

    return userInHousehold;
  }
}
