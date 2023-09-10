import { ItemsService } from '@pantrylab/items/server';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';

@Injectable()
export class MealItemsHouseholdGuard implements CanActivate {
  constructor(private itemsService: ItemsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const { householdId } = request.params;

    if (!request.body.itemIds) {
      return true;
    }

    const bodySchema = z.object({
      itemIds: z.array(z.string().uuid()),
    });

    const bodyResults = bodySchema.safeParse(request.body);

    if (!bodyResults.success) {
      throw new BadRequestException('Valid item IDs required in request body');
    }

    const { itemIds } = bodyResults.data;

    const itemsInHousehold = await Promise.all(
      itemIds.map((itemId) =>
        this.itemsService.itemInHousehold(householdId, itemId),
      ),
    );

    const allItemsInHousehold = itemsInHousehold.every((item) => item);

    if (!allItemsInHousehold) {
      throw new BadRequestException('All items must be in household');
    }

    return allItemsInHousehold;
  }
}
