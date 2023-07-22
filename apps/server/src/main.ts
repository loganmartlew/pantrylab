import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import cookieParser from 'cookie-parser';
import { serverConfig as config } from '@pantrylab/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = config.port;

  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());

  patchNestJsSwagger();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PantryLab')
    .setDescription('The PantryLab API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addCookieAuth('refreshToken')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
