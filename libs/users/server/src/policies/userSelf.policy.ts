import { ExecutionContext } from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { UserEntity } from '../entities';

export class UserSelfPolicy implements Policy {
  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userId = req.params.id;

    return user.id === userId;
  }
}
