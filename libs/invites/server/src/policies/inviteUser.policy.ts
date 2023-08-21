import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Policy } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users';
import { InvitesService } from '../invites.service';

@Injectable()
export class InviteUserPolicy implements Policy {
  constructor(private invitesService: InvitesService) {}

  async checkConditions(user: UserEntity, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const inviteId = req.params.inviteId;

    const invite = await this.invitesService.findOne(inviteId);

    if (!invite) {
      throw new NotFoundException(`Invite does not exist`);
    }

    const inviteForUser = invite.userId === user.id;

    if (!inviteForUser) {
      throw new ForbiddenException(`Invite is not for this user`);
    }

    return inviteForUser;
  }
}
