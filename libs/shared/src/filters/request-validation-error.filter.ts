import { sendErrorResponse } from '@pantrylab/shared/util';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RequestValidationError } from '@ts-rest/nest';

@Catch(RequestValidationError)
export class RequestValidationErrorFilter implements ExceptionFilter {
  catch(exception: RequestValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    sendErrorResponse<400>(
      400,
      exception.message,
      response,
      exception.body?.errors,
    );
  }
}
