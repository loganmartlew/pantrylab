import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Policy } from '../types';
import { CHECK_POLICIES_KEY } from '../decorators/checkPolicies.decorator';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private moduleRef: ModuleRef) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyTypes =
      this.reflector.get<Type<Policy>[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    const { user: reqUser } = context.switchToHttp().getRequest();

    if (!reqUser) {
      throw new UnauthorizedException();
    }

    const user: UserEntity = reqUser;

    const policies = policyTypes.map((policyType) =>
      this.moduleRef.get(policyType, { strict: false })
    );

    return policies.every((handler) => handler.checkConditions(user));
  }
}
