import { User } from '@pantrylab/users/interface';
import { ExecutionContext } from '@nestjs/common';

export interface Policy {
  checkConditions(user: User, context: ExecutionContext): Promise<boolean>;
}
