import {
  ExecutionContext,
  CanActivate,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { InvitesService } from '../invites.service';

@Injectable()
export class InviteParamGuard implements CanActivate {
  constructor(private invitesService: InvitesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const inviteId = request.params.inviteId;

    const inviteExists = await this.invitesService.checkExists(inviteId);

    if (!inviteExists) {
      throw new NotFoundException('Invite does not exist');
    }

    return true;
  }
}
