import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { DbModule } from '../db/db.module';
import { HouseholdsModule } from '../households/households.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [InvitesController],
  providers: [InvitesService],
  exports: [InvitesService],
  imports: [DbModule, HouseholdsModule, UsersModule],
})
export class InvitesModule {}
