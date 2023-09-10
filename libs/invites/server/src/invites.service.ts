import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '@pantrylab/db';
import { HouseholdsService } from '@pantrylab/households/server';
import { InviteCreate } from '@pantrylab/invites/interface';
import { UsersService } from '@pantrylab/users/server';

@Injectable()
export class InvitesService {
  constructor(
    private db: DbService,
    private householdsService: HouseholdsService,
    private usersService: UsersService
  ) {}

  async checkExists(id: string) {
    const invite = await this.db.invite.findUnique({
      where: { id },
    });
    return !!invite;
  }

  async create(inviteDto: InviteCreate) {
    const invite = await this.db.invite.create({
      data: inviteDto,
    });
    return invite;
  }

  async findAll() {
    const invites = await this.db.invite.findMany();
    return invites;
  }

  async findAllInHousehold(householdId: string) {
    const invites = await this.db.invite.findMany({
      where: { householdId },
      include: { user: true },
    });
    return invites;
  }

  async findAllForUser(userId: string) {
    const invites = await this.db.invite.findMany({
      where: { userId },
      include: { household: true },
    });
    return invites;
  }

  async findOne(id: string) {
    const invite = await this.db.invite.findUnique({
      where: { id },
    });
    return invite;
  }

  async accept(id: string) {
    const invite = await this.findOne(id);

    if (!invite) {
      throw new NotFoundException(`Invite with id: ${id} not found`);
    }

    if (!(await this.householdsService.checkExists(invite.householdId))) {
      throw new NotFoundException(
        `Household with id: ${invite.householdId} not found`
      );
    }

    if (!(await this.usersService.checkExists(invite.userId))) {
      throw new NotFoundException(`User with id: ${invite.userId} not found`);
    }

    await this.db.householdUser.create({
      data: {
        householdId: invite.householdId,
        userId: invite.userId,
        role: 'USER',
      },
    });

    await this.remove(id);

    return invite;
  }

  async remove(id: string) {
    const invite = await this.db.invite.delete({
      where: { id },
    });
    return invite;
  }
}
