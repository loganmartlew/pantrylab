import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { HouseholdsModule } from '@pantrylab/households/server';
import { UsersModule } from '@pantrylab/users';
import { InviteUserPolicy } from './policies';

@Module({
  controllers: [InvitesController],
  providers: [InvitesService, InviteUserPolicy],
  exports: [InvitesService],
  imports: [HouseholdsModule, UsersModule],
})
export class InvitesModule {}
