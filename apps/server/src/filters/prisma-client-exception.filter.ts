import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;

    switch (exception.code) {
      case 'P2000':
        setupResponse(HttpStatus.BAD_REQUEST, message, response);
        break;
      case 'P2001':
        setupResponse(HttpStatus.NOT_FOUND, message, response);
        break;
      case 'P2002':
        setupResponse(HttpStatus.BAD_REQUEST, message, response);
        break;
      case 'P2025':
        setupResponse(HttpStatus.NOT_FOUND, message, response);
        break;
      default:
        super.catch(exception, host);
    }
  }
}

function setupResponse(status: number, message: string, response: Response) {
  response.status(status).json({
    statusCode: status,
    message,
  });
}
