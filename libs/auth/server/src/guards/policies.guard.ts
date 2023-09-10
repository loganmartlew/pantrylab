import { User } from '@pantrylab/users/interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators';
import { Policy } from '../types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyTypes =
      this.reflector.get<Type<Policy>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user: reqUser } = context.switchToHttp().getRequest();

    if (!reqUser) {
      throw new UnauthorizedException();
    }

    const user: User = reqUser;

    const policies = policyTypes.map((policyType) =>
      this.moduleRef.get(policyType, { strict: false }),
    );

    const policyResults = await Promise.all(
      policies.map(
        async (policy) => await policy.checkConditions(user, context),
      ),
    );

    return policyResults.every((result) => result);
  }
}
