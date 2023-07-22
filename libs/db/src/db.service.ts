import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    const exitHandler = async () => {
      await app.close();
    };

    process.on('exit', exitHandler);
    process.on('beforeExit', exitHandler);
    process.on('SIGINT', exitHandler);
    process.on('SIGTERM', exitHandler);
    process.on('SIGUSR2', exitHandler);
  }
}
