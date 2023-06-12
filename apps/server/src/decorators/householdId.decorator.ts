import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const HouseholdId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const householdId = request.query.householdId;

    if (!householdId || typeof householdId !== 'string') {
      throw new BadRequestException(
        'Required query param householdId was not provided'
      );
    }

    return householdId;
  }
);
