import { ExecutionContext } from '@nestjs/common';
import { UserEntity } from '@pantrylab/users';

export interface Policy {
  checkConditions(
    user: UserEntity,
    context: ExecutionContext
  ): Promise<boolean>;
}
