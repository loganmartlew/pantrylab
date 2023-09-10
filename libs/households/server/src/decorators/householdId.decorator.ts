import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const HouseholdId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const householdId = request.query.householdId;

    return householdId;
  },
);
