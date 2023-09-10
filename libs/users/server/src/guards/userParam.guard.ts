import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class UserParamGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.params.userId;

    const userExists = await this.usersService.checkExists(userId);

    if (!userExists) {
      throw new NotFoundException('User does not exist');
    }

    return true;
  }
}
