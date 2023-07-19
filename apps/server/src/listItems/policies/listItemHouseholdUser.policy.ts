import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '../../auth/types';
import { UserEntity } from '@pantrylab/users';
import { ListItemsService } from '../listItems.service';
import { HouseholdsService } from '../../households/households.service';

@Injectable()
export class ListItemHouseholdUserPolicy implements Policy {
  constructor(
    private listItemsService: ListItemsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const listItemId = req.params.id;

    if (!listItemId || typeof listItemId !== 'string') {
      throw new BadRequestException('List item id is required');
    }

    const listItem = await this.listItemsService.findOne(listItemId);

    if (!listItem) {
      throw new NotFoundException(`List item with id: ${listItemId} not found`);
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      listItem.householdId
    );

    return userInHousehold;
  }
}
