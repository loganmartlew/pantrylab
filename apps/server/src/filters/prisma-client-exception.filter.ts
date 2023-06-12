import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2000':
        setupResponse(
          HttpStatus.BAD_REQUEST,
          "The provided value for the column is too long for the column's type",
          'Bad Input',
          response
        );
        break;
      case 'P2001':
        setupResponse(
          HttpStatus.NOT_FOUND,
          'Not Found',
          'The record searched for in the where condition does not exist',
          response
        );
        break;
      case 'P2002':
        setupResponse(
          HttpStatus.BAD_REQUEST,
          'Unique constraint failed',
          'Bad Input',
          response
        );
        break;
      case 'P2025':
        setupResponse(
          HttpStatus.NOT_FOUND,
          'An operation failed because it depends on one or more records that were required but not found',
          'Not Found',
          response
        );
        break;
      default:
        super.catch(exception, host);
    }
  }
}

function setupResponse(
  status: number,
  message: string,
  error: string,
  response: Response
) {
  response.status(status).json({
    statusCode: status,
    message,
    error,
  });
}
