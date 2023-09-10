import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DbService } from './db.service';
import { DbClientExceptionFilter } from './filters';

@Global()
@Module({
  providers: [
    DbService,
    {
      provide: APP_FILTER,
      useClass: DbClientExceptionFilter,
    },
  ],
  exports: [DbService],
})
export class DbModule {}
