import { ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

export interface Policy {
  checkConditions(
    user: UserEntity,
    context: ExecutionContext
  ): Promise<boolean>;
}
