import { AuthModule } from '@pantrylab/auth/server';
import { DbModule } from '@pantrylab/db';
import { HouseholdsModule } from '@pantrylab/households/server';
import { InvitesModule } from '@pantrylab/invites/server';
import { ItemsModule } from '@pantrylab/items/server';
import { ListItemsModule } from '@pantrylab/listItems/server';
import { MealsModule } from '@pantrylab/meals/server';
import { PlannedMealsModule } from '@pantrylab/plannedMeals/server';
import { RequestValidationErrorFilter } from '@pantrylab/shared/filters';
import { UsersModule } from '@pantrylab/users/server';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

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
