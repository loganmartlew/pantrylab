import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { createTsRestErrorResponse } from '@pantrylab/shared/util';
import { Auth, AuthUser } from '@pantrylab/auth/server';
import { UserSelfPolicy } from './policies';
import { usersContract as c } from '@pantrylab/users/interface';
import { TsRest, TsRestHandler, tsRestHandler } from '@ts-rest/nest';

@Controller()
@TsRest({ validateResponses: true })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @TsRestHandler(c.getSelf)
  @Auth([], UserSelfPolicy)
  async getSelf(@AuthUser('id') userId: string) {
    return tsRestHandler(c.getSelf, async () => {
      const user = await this.usersService.findOne(userId);

      if (!user) {
        return createTsRestErrorResponse<404>(
          404,
          `User with id: ${userId} not found`
        );
      }

      return { status: 200 as const, body: user };
    });
  }

  @TsRestHandler(c.updateSelf)
  @Auth([], UserSelfPolicy)
  async updateSelf(@AuthUser('id') userId: string) {
    return tsRestHandler(c.updateSelf, async ({ body }) => {
      const user = await this.usersService.update(userId, body);

      if (!user) {
        return createTsRestErrorResponse<404>(
          404,
          `User with id: ${userId} not found`
        );
      }

      return { status: 200 as const, body: user };
    });
  }
}
