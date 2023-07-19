import { SetMetadata, Type } from '@nestjs/common';
import { Policy } from '../types';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: Type<Policy>[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
