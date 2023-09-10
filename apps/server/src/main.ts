import { contract } from '@pantrylab/api';
import { serverConfig as config } from '@pantrylab/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import cookieParser from 'cookie-parser';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const port = config.port;

  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser());

  patchNestJsSwagger();

  const document = generateOpenApi(contract, {
    info: {
      title: 'PantryLab',
      description: 'The PantryLab API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearer: {
          scheme: 'bearer',
          bearerFormat: 'JWT',
          type: 'http',
        },
        cookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  });

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
