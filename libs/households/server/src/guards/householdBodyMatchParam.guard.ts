import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';

@Injectable()
export class HouseholdBodyMatchParamGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const householdIdParam = request.params.householdId;

    const bodySchema = z.object({
      householdId: z.string().uuid(),
    });

    const bodyResults = bodySchema.safeParse(request.body);

    if (!bodyResults.success) {
      throw new BadRequestException(
        'Valid household ID required in request body'
      );
    }

    const householdIdBody = bodyResults.data.householdId;

    if (householdIdParam !== householdIdBody) {
      throw new BadRequestException('Body householdId must match route param');
    }

    return true;
  }
}
