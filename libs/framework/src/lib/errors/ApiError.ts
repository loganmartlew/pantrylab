import errorCodes, { Code, validCodes } from './errorCodes';

export default class ApiError {
  public readonly message: string;
  public readonly errorCode: Code;
  public readonly statusCode: number;
  public readonly parentError: unknown;

  constructor(
    parentError: unknown | null,
    errorCode: Code | null,
    message: string | null
  ) {
    if (parentError instanceof ApiError) {
      this.parentError = null;
      this.message = parentError.message;
      this.errorCode = parentError.errorCode;
      this.statusCode = parentError.statusCode;
      return;
    }

    this.parentError = parentError;

    if (errorCode && validCodes.has(errorCode.internalCode)) {
      this.errorCode = errorCode;
    } else {
      this.errorCode = errorCodes.unknown.UNKNOWN;
    }

    this.message = message ?? this.errorCode.message;
    this.statusCode = this.errorCode.statusCode;
  }
}
