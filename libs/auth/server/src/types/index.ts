import { ExecutionContext } from '@nestjs/common';
import { User } from '@pantrylab/users/interface';

export interface Policy {
  checkConditions(user: User, context: ExecutionContext): Promise<boolean>;
}
