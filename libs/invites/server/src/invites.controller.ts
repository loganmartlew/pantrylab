import { Controller } from '@nestjs/common';
import { InvitesService } from './invites.service';
import {
  HouseholdOwnerPolicy,
  HouseholdUserPolicy,
  HouseholdParamGuard,
  HouseholdsService,
} from '@pantrylab/households/server';
import { Auth, AuthUser } from '@pantrylab/auth';
import { InviteUserPolicy } from './policies';
import { Invite, invitesContract as c } from '@pantrylab/invites/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { InviteParamGuard } from './guards';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import { UsersService } from '@pantrylab/users';

@Controller()
@TsRest({ validateResponses: true })
export class InvitesController {
  constructor(
    private readonly invitesService: InvitesService,
    private readonly usersService: UsersService,
    private readonly householdsService: HouseholdsService
  ) {}

  @TsRestHandler(c.findUserInvites)
  @Auth()
  findUserInvites(@AuthUser('id') userId: string) {
    return tsRestHandler(c.findUserInvites, async () => {
      const invites: Invite[] = await this.invitesService.findAllForUser(
        userId
      );
      return { status: 200 as const, body: invites };
    });
  }

  @TsRestHandler(c.acceptInvite)
  @Auth([InviteParamGuard], InviteUserPolicy)
  acceptInvite() {
    return tsRestHandler(c.acceptInvite, async ({ params: { inviteId } }) => {
      const invite: Invite = await this.invitesService.accept(inviteId);
      return { status: 200 as const, body: invite };
    });
  }

  @TsRestHandler(c.rejectInvite)
  @Auth([InviteParamGuard], InviteUserPolicy)
  rejectInvite() {
    return tsRestHandler(c.rejectInvite, async ({ params: { inviteId } }) => {
      const invite: Invite = await this.invitesService.remove(inviteId);
      return { status: 200 as const, body: invite };
    });
  }

  @TsRestHandler(c.createInvite)
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
  createInvite() {
    return tsRestHandler(
      c.createInvite,
      async ({ body, params: { householdId } }) => {
        if (body.householdId !== householdId) {
          return createTsRestErrorResponse<400>(
            400,
            `Invite householdId must match route param`
          );
        }

        const userExists = await this.usersService.checkExists(body.userId);
        if (!userExists) {
          return createTsRestErrorResponse<404>(
            404,
            `User with id: ${body.userId} not found`
          );
        }

        const userInHousehold =
          await this.householdsService.checkUserInHousehold(
            body.userId,
            householdId
          );
        if (userInHousehold) {
          return createTsRestErrorResponse<400>(
            400,
            `User is already in household`
          );
        }

        const invite: Invite = await this.invitesService.create(body);
        return { status: 201 as const, body: invite };
      }
    );
  }

  @TsRestHandler(c.findHouseholdnvites)
  @Auth([HouseholdParamGuard], HouseholdUserPolicy)
  findHouseholdnvites() {
    return tsRestHandler(
      c.findHouseholdnvites,
      async ({ params: { householdId } }) => {
        const invites: Invite[] = await this.invitesService.findAllInHousehold(
          householdId
        );
        return { status: 200 as const, body: invites };
      }
    );
  }

  @TsRestHandler(c.cancelInvite)
  @Auth([HouseholdParamGuard], HouseholdOwnerPolicy)
  cancelInvite() {
    return tsRestHandler(c.cancelInvite, async ({ params: { inviteId } }) => {
      const invite: Invite = await this.invitesService.remove(inviteId);
      return { status: 200 as const, body: invite };
    });
  }
}
