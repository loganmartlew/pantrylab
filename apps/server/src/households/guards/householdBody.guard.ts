import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { HouseholdsService } from '../households.service';
import { householdIdMetadataKey } from '../meta';

@Injectable()
export class HouseholdBodyGuard implements CanActivate {
  constructor(private householdsService: HouseholdsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const householdId = request.body.householdId;

    if (!householdId || typeof householdId !== 'string') {
      throw new ForbiddenException(
        'A valid householdId in the request body is required'
      );
    }

    const householdExists = await this.householdsService.checkExists(
      householdId
    );

    if (!householdExists) {
      throw new NotFoundException('Household does not exist');
    }

    Reflect.defineMetadata(
      householdIdMetadataKey,
      householdId,
      context.getHandler()
    );

    return true;
  }
}