import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { APP_FILTER } from '@nestjs/core';
import { DbClientExceptionFilter } from './filters/db-client-exception.filter';

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
