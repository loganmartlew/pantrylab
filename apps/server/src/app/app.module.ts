import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseholdsModule } from '../households/households.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from '@pantrylab/users';
import { ItemsModule } from '../items/items.module';
import { ListItemsModule } from '../listItems/listItems.module';
import { InvitesModule } from '../invites/invites.module';
import { MealsModule } from '../meals/meals.module';
import { PlannedMealsModule } from '../plannedMeals/plannedMeals.module';
import { DbModule } from '../db/db.module';
import { AuthModule } from '../auth/auth.module';

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
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
