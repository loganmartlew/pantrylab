import { ExecutionContext } from '@nestjs/common';
import { Policy } from '@pantrylab/auth/server';
import { User } from '@pantrylab/users/interface';

export class UserSelfPolicy implements Policy {
  async checkConditions(user: User, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const userId = req.params.id;

    return user.id === userId;
  }
}
