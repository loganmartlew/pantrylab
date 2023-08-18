import { Response } from 'express';
import { ErrorResponse } from '@pantrylab/shared/types';
import createErrorResponse from './createErrorResponse';

export default function <S extends number>(
  status: S,
  message: string,
  response: Response,
  errors?: unknown
) {
  const body: ErrorResponse<S> = createErrorResponse<S>(
    status,
    message,
    errors
  );

  response.status(status).json(body);
}
