import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { User } from '@pantrylab/users/interface';
import { ItemsService } from '../items.service';
import { HouseholdsService } from '@pantrylab/households/server';
import { z } from 'zod';

@Injectable()
export class ItemHouseholdPolicy implements Policy {
  constructor(
    private itemsService: ItemsService,
    private householdsService: HouseholdsService
  ) {}

  async checkConditions(user: User, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { householdId } = req.params;

    const bodySchema = z.object({
      itemId: z.string().uuid(),
    });

    const bodyResults = bodySchema.safeParse(req.body);

    if (!bodyResults.success) {
      throw new BadRequestException('Valid item ID required in request body');
    }

    const itemId = bodyResults.data.itemId;

    const item = await this.itemsService.findOne(itemId);

    if (!item) {
      throw new NotFoundException(`Item with id: ${itemId} not found`);
    }

    const itemInHousehold = item.householdId === householdId;

    if (!itemInHousehold) {
      throw new BadRequestException(
        `Item with id: ${itemId} does not belong to household with id: ${householdId}`
      );
    }

    return itemInHousehold;
  }
}
