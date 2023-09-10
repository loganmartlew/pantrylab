import { applyDecorators, CanActivate, Type, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessTokenGuard, PoliciesGuard } from '../guards';
import { Policy } from '../types';
import { CheckPolicies } from './checkPolicies.decorator';

export function Auth(
  guards?: Type<CanActivate>[],
  ...handlers: Type<Policy>[]
) {
  return applyDecorators(
    CheckPolicies(...handlers),
    UseGuards(AccessTokenGuard, ...(guards || []), PoliciesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      schema: {
        example: { statusCode: 401, message: 'Unauthorized' },
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
      },
      content: {
        'application/json': {},
      },
    }),
    ApiForbiddenResponse({
      schema: {
        example: { statusCode: 403, message: 'Forbidden' },
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
      },
      content: {
        'application/json': {},
      },
    }),
  );
}
