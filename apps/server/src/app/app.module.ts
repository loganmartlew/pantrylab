import { Module } from '@nestjs/common';

import { HouseholdsModule } from '@pantrylab/households/server';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from '@pantrylab/users';
import { ItemsModule } from '@pantrylab/items/server';
import { ListItemsModule } from '@pantrylab/listItems/server';
import { InvitesModule } from '@pantrylab/invites/server';
import { MealsModule } from '@pantrylab/meals/server';
import { PlannedMealsModule } from '@pantrylab/plannedMeals';
import { DbModule } from '@pantrylab/db';
import { AuthModule } from '@pantrylab/auth';
import { RequestValidationErrorFilter } from '@pantrylab/shared/filters';

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
    {
      provide: APP_FILTER,
      useClass: RequestValidationErrorFilter,
    },
  ],
})
export class AppModule {}
