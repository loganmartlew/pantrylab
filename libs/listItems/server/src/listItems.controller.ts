import { Controller } from '@nestjs/common';
import { ListItemsService } from './listItems.service';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import {
  HouseholdUserPolicy,
  HouseholdBodyMatchParamGuard,
  HouseholdParamGuard,
} from '@pantrylab/households/server';
import { Auth } from '@pantrylab/auth';
import { ListItemHouseholdUserPolicy } from './policies';
import {
  ListItem,
  listItemsContract as c,
} from '@pantrylab/listItems/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { ItemHouseholdPolicy } from 'libs/items/server/src/policies/itemHousehold.policy';

@Controller()
@TsRest({ validateResponses: true })
export class ListItemsController {
  constructor(private readonly listItemsService: ListItemsService) {}

  @TsRestHandler(c.createListItem)
  @Auth(
    [HouseholdParamGuard, HouseholdBodyMatchParamGuard],
    ItemHouseholdPolicy,
    HouseholdUserPolicy
  )
  createListItem() {
    return tsRestHandler(c.createListItem, async ({ body }) => {
      const listItem: ListItem = await this.listItemsService.create(body);
      return { status: 201 as const, body: listItem };
    });
  }

  @TsRestHandler(c.findHouseholdListItems)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  findHouseholdListItems() {
    return tsRestHandler(
      c.findHouseholdListItems,
      async ({ params: { householdId } }) => {
        const listItems: ListItem[] =
          await this.listItemsService.findAllInHousehold(householdId);
        return { status: 200 as const, body: listItems };
      }
    );
  }

  @TsRestHandler(c.findHouseholdListItem)
  @Auth([HouseholdParamGuard], ListItemHouseholdUserPolicy)
  async findHouseholdListItem() {
    return tsRestHandler(
      c.findHouseholdListItem,
      async ({ params: { listItemId } }) => {
        const listItem = await this.listItemsService.findOne(listItemId);

        if (!listItem) {
          return createTsRestErrorResponse<404>(
            404,
            `ListItem with id: ${listItemId} not found`
          );
        }

        return { status: 200 as const, body: listItem };
      }
    );
  }

  @TsRestHandler(c.updateHouseholdListItem)
  @Auth([HouseholdParamGuard], ListItemHouseholdUserPolicy)
  async updateHouseholdListItem() {
    return tsRestHandler(
      c.updateHouseholdListItem,
      async ({ params: { listItemId }, body }) => {
        const listItem = await this.listItemsService.update(listItemId, body);

        if (!listItem) {
          return createTsRestErrorResponse<404>(
            404,
            `List item with id: ${listItemId} not found`
          );
        }

        return { status: 200 as const, body: listItem };
      }
    );
  }

  @TsRestHandler(c.completeHouseholdListItem)
  @Auth([HouseholdParamGuard], ListItemHouseholdUserPolicy)
  async completeHouseholdListItem() {
    return tsRestHandler(
      c.completeHouseholdListItem,
      async ({ params: { listItemId } }) => {
        const listItem = await this.listItemsService.update(listItemId, {
          completedAt: new Date(),
        });

        if (!listItem) {
          return createTsRestErrorResponse<404>(
            404,
            `List item with id: ${listItemId} not found`
          );
        }

        return { status: 200 as const, body: listItem };
      }
    );
  }

  @TsRestHandler(c.deleteHouseholdListItem)
  @Auth([HouseholdParamGuard], ListItemHouseholdUserPolicy)
  async deleteHouseholdListItem() {
    return tsRestHandler(
      c.deleteHouseholdListItem,
      async ({ params: { listItemId } }) => {
        const listItem = await this.listItemsService.remove(listItemId);

        if (!listItem) {
          return createTsRestErrorResponse<404>(
            404,
            `List item with id: ${listItemId} not found`
          );
        }

        return { status: 200 as const, body: listItem };
      }
    );
  }
}
