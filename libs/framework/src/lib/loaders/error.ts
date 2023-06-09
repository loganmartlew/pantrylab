import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import errorCodes from '../errors/errorCodes';
import { Loader } from '../types';

const ErrorLoader: Loader = async (app) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    const apiError =
      error instanceof ApiError
        ? error
        : new ApiError(error, errorCodes.unknown.UNKNOWN, null);

    console.error(apiError);

    const response: ApiResponse = {
      status: apiError.statusCode,
      message: apiError.message,
      error: apiError,
    };

    res.status(apiError.statusCode).json(response);
  });
};

export default ErrorLoader;
