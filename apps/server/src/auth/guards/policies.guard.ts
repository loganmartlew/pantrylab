import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Policy } from '../types';
import { CHECK_POLICIES_KEY } from '../decorators/checkPolicies.decorator';
import { UserSchema } from '../../users/entities/user.entity';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private moduleRef: ModuleRef) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyTypes =
      this.reflector.get<Type<Policy>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    const req = context.switchToHttp().getRequest();
    const user = UserSchema.parse(req.user);

    const policies = policyTypes.map((policyType) =>
      this.moduleRef.get(policyType, { strict: false })
    );

    return policies.every((handler) => handler.checkConditions(user));
  }
}
