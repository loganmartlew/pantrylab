import {
  ExecutionContext,
  ForbiddenException,
  createParamDecorator,
} from '@nestjs/common';
import { UserEntity } from '@pantrylab/users/server';

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
  }
);
