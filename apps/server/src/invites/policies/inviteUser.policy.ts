import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '../../auth/types';
import { UserEntity } from '@pantrylab/users';
import { InvitesService } from '../invites.service';

@Injectable()
export class InviteUserPolicy implements Policy {
  constructor(private invitesService: InvitesService) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const inviteId = req.params.id;

    if (!inviteId || typeof inviteId !== 'string') {
      throw new BadRequestException('Invite id is required');
    }

    const invite = await this.invitesService.findOne(inviteId);

    if (!invite) {
      throw new NotFoundException(`Invite with id: ${inviteId} not found`);
    }

    const inviteForUser = invite.userId === user.id;

    return inviteForUser;
  }
}
