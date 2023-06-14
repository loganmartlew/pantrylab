import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HouseholdsModule } from '../households/households.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';
import { ListItemsModule } from '../listItems/listItems.module';
import { InvitesModule } from '../invites/invites.module';
import { MealsModule } from '../meals/meals.module';

@Module({
  imports: [
    HouseholdsModule,
    UsersModule,
    ItemsModule,
    ListItemsModule,
    InvitesModule,
    MealsModule,
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
