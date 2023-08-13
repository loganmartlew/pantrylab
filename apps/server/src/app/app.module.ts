import { Module } from '@nestjs/common';

import { HouseholdsModule } from '@pantrylab/households/server';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from '@pantrylab/users';
import { ItemsModule } from '@pantrylab/items';
import { ListItemsModule } from '@pantrylab/listItems';
import { InvitesModule } from '@pantrylab/invites';
import { MealsModule } from '@pantrylab/meals';
import { PlannedMealsModule } from '@pantrylab/plannedMeals';
import { DbModule } from '@pantrylab/db';
import { AuthModule } from '@pantrylab/auth';

@Module({
  imports: [
    DbModule,
    AuthModule,
    HouseholdsModule,
    UsersModule,
    ItemsModule,
    ListItemsModule,
    InvitesModule,
    MealsModule,
    PlannedMealsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
