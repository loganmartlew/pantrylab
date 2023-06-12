import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const Search = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const search = request.query.search;

    if (!search) return '';

    if (typeof search !== 'string') {
      throw new BadRequestException('Search term must be a string');
    }

    return search;
  }
);
