import { User } from '@pantrylab/users/interface';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

type UserKey = keyof User;

export const AuthUser = createParamDecorator(
  (data: UserKey | null, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user: User = req.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
