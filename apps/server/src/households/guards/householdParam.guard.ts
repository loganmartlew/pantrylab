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
export class HouseholdParamGuard implements CanActivate {
  constructor(private householdsService: HouseholdsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const householdId = request.params.id;

    if (!householdId || typeof householdId !== 'string') {
      throw new ForbiddenException('A valid householdId url param is required');
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
