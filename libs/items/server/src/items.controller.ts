import { Controller } from '@nestjs/common';
import { ItemsService } from './items.service';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import {
  HouseholdUserPolicy,
  HouseholdParamGuard,
  HouseholdBodyMatchParamGuard,
} from '@pantrylab/households/server';
import { Auth } from '@pantrylab/auth/server';
import { ItemHouseholdUserPolicy } from './policies';
import { Item, itemsContract as c } from '@pantrylab/items/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';

@Controller()
@TsRest({ validateResponses: true })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @TsRestHandler(c.createItem)
  @Auth(
    [HouseholdParamGuard, HouseholdBodyMatchParamGuard],
    HouseholdUserPolicy
  )
  createItem() {
    return tsRestHandler(c.createItem, async ({ body }) => {
      const item: Item = await this.itemsService.create(body);
      return { status: 201 as const, body: item };
    });
  }

  @TsRestHandler(c.findHouseholdItems)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  findHouseholdItems() {
    return tsRestHandler(
      c.findHouseholdItems,
      async ({ params: { householdId }, query: { search } }) => {
        const items: Item[] = await this.itemsService.findAllInHousehold(
          householdId,
          search
        );
        return { status: 200 as const, body: items };
      }
    );
  }

  @TsRestHandler(c.findHouseholdItem)
  @Auth([HouseholdParamGuard], ItemHouseholdUserPolicy)
  async findHouseholdItem() {
    return tsRestHandler(
      c.findHouseholdItem,
      async ({ params: { itemId } }) => {
        const item = await this.itemsService.findOne(itemId);

        if (!item) {
          return createTsRestErrorResponse<404>(
            404,
            `Item with id: ${itemId} not found`
          );
        }

        return { status: 200 as const, body: item };
      }
    );
  }

  @TsRestHandler(c.updateHouseholdItem)
  @Auth([HouseholdParamGuard], ItemHouseholdUserPolicy)
  async updateHouseholdItem() {
    return tsRestHandler(
      c.updateHouseholdItem,
      async ({ params: { itemId }, body }) => {
        const item = await this.itemsService.update(itemId, body);

        if (!item) {
          return createTsRestErrorResponse<404>(
            404,
            `Item with id: ${itemId} not found`
          );
        }

        return { status: 200 as const, body: item };
      }
    );
  }

  @TsRestHandler(c.deleteHouseholdItem)
  @Auth([HouseholdParamGuard], ItemHouseholdUserPolicy)
  async deleteHouseholdItem() {
    return tsRestHandler(
      c.deleteHouseholdItem,
      async ({ params: { itemId } }) => {
        const item = await this.itemsService.remove(itemId);

        if (!item) {
          return createTsRestErrorResponse<404>(
            404,
            `Item with id: ${itemId} not found`
          );
        }

        return { status: 200 as const, body: item };
      }
    );
  }
}
