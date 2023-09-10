import { UserEntity } from '@pantrylab/users/server';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

type UserKey = keyof UserEntity;

export const AuthUser = createParamDecorator(
  (data: UserKey | null, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user: UserEntity = req.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);
