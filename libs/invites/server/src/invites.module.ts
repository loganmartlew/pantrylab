import { HouseholdsModule } from '@pantrylab/households/server';
import { UsersModule } from '@pantrylab/users/server';
import { Module } from '@nestjs/common';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { InviteUserPolicy } from './policies';

@Module({
  controllers: [InvitesController],
  providers: [InvitesService, InviteUserPolicy],
  exports: [InvitesService],
  imports: [HouseholdsModule, UsersModule],
})
export class InvitesModule {}
