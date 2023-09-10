import { Controller } from '@nestjs/common';
import { HouseholdsService } from './households.service';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import { Auth, AuthUser } from '@pantrylab/auth/server';
import { HouseholdOwnerPolicy, HouseholdUserPolicy } from './policies';
import {
  Household,
  householdsContract as c,
} from '@pantrylab/households/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { HouseholdParamGuard } from './guards';
import { UserParamGuard } from '@pantrylab/users/server';

@Controller()
@TsRest({ validateResponses: true })
export class HouseholdsController {
  constructor(private readonly householdsService: HouseholdsService) {}

  @TsRestHandler(c.createHousehold)
  @Auth()
  createHousehold(@AuthUser('id') userId: string) {
    return tsRestHandler(c.createHousehold, async ({ body }) => {
      const household: Household = await this.householdsService.create(body);
      await this.householdsService.addUser(userId, household.id);
      return { status: 201 as const, body: household };
    });
  }

  @TsRestHandler(c.findHouseholdsByUser)
  @Auth()
  findHouseholdsByUser(@AuthUser('id') userId: string) {
    return tsRestHandler(c.findHouseholdsByUser, async () => {
      const households = await this.householdsService.findAllByUserId(userId);
      return { status: 200 as const, body: households };
    });
  }

  @TsRestHandler(c.findHouseholdById)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  async findHouseholdById() {
    return tsRestHandler(
      c.findHouseholdById,
      async ({ params: { householdId } }) => {
        const household = await this.householdsService.findOne(householdId);

        if (!household) {
          return createTsRestErrorResponse<404>(
            404,
            `Household with id: ${householdId} not found`
          );
        }

        return { status: 200 as const, body: household };
      }
    );
  }

  @TsRestHandler(c.updateHousehold)
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
  async updateHousehold() {
    return tsRestHandler(
      c.updateHousehold,
      async ({ params: { householdId }, body }) => {
        const household = await this.householdsService.update(
          householdId,
          body
        );

        return { status: 200 as const, body: household };
      }
    );
  }

  @TsRestHandler(c.deleteHousehold)
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
  async deleteHousehold() {
    return tsRestHandler(
      c.deleteHousehold,
      async ({ params: { householdId } }) => {
        const household = await this.householdsService.remove(householdId);

        return { status: 200 as const, body: household };
      }
    );
  }

  @TsRestHandler(c.removeHouseholdUser)
  @Auth([HouseholdParamGuard, UserParamGuard], HouseholdOwnerPolicy)
  async removeHouseholdUser() {
    return tsRestHandler(
      c.removeHouseholdUser,
      async ({ params: { householdId, userId } }) => {
        await this.householdsService.removeUser(userId, householdId);

        return { status: 200 as const, body: null };
      }
    );
  }
}
