import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users';
import { ItemsService } from '../items.service';
import { HouseholdsService } from '@pantrylab/households';

@Injectable()
export class ItemHouseholdUserPolicy implements Policy {
  constructor(
    private itemsService: ItemsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const itemId = req.params.id;

    if (!itemId || typeof itemId !== 'string') {
      throw new BadRequestException('Item id is required');
    }

    const item = await this.itemsService.findOne(itemId);

    if (!item) {
      throw new NotFoundException(`Item with id: ${itemId} not found`);
    }

    const userInHousehold = await this.householdsService.checkUserInHousehold(
      user.id,
      item.householdId
    );

    return userInHousehold;
  }
}
