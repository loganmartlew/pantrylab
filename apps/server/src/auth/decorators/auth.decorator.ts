import { Type, UseGuards, applyDecorators } from '@nestjs/common';
import { Policy } from '../types';
import { CheckPolicies } from './checkPolicies.decorator';
import { AccessTokenGuard, PoliciesGuard } from '../guards';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function Auth(...handlers: Type<Policy>[]) {
  return applyDecorators(
    CheckPolicies(...handlers),
    UseGuards(AccessTokenGuard, PoliciesGuard),
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
    })
  );
}
