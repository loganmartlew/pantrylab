import { Policy } from '@pantrylab/auth/server';
import { HouseholdsService } from '@pantrylab/households/server';
import { User } from '@pantrylab/users/interface';
import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from '../items.service';

@Injectable()
export class ItemHouseholdUserPolicy implements Policy {
  constructor(
    private itemsService: ItemsService,
    private householdsService: HouseholdsService,
  ) {}

  async checkConditions(user: User, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { itemId, householdId } = req.params;

    const item = await this.itemsService.findOne(itemId);

    if (!item) {
      throw new NotFoundException(`Item with id: ${itemId} not found`);
    }

    if (item.householdId !== householdId) {
      throw new BadRequestException(
        `Item with id: ${itemId} does not belong to household with id: ${householdId}`,
      );
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      item.householdId,
    );

    return userInHousehold;
  }
}
