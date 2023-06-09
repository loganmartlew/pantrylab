import statusCodes from 'http-status-codes';

export interface Code {
  message: string;
  statusCode: number;
  internalCode: number;
}

export class Code implements Code {
  constructor(input: {
    internalCode: number;
    message: string;
    statusCode?: number;
  }) {
    this.internalCode = input.internalCode;
    this.message = input.message;
    this.statusCode = input.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR;
  }
}

const unknownCodes = {
  UNKNOWN: new Code({
    internalCode: 1000,
    message: 'An unknown error occurred',
  }),
} as const;

const httpCodes = {
  UNKNOWN: new Code({
    internalCode: 2000,
    message: 'An unknown HTTP error occurred',
  }),
  RATE_LIMIT: new Code({
    internalCode: 2001,
    message: 'Request failed due to rate limiting',
    statusCode: statusCodes.TOO_MANY_REQUESTS,
  }),
  UNAUTHENTICATED: new Code({
    internalCode: 2002,
    message: 'Request failed due to invalid credentials',
    statusCode: statusCodes.UNAUTHORIZED,
  }),
  UNAUTHORIZED: new Code({
    internalCode: 2003,
    message: 'Request failed due to invalid permissions',
    statusCode: statusCodes.FORBIDDEN,
  }),
  INVALID_INPUT: new Code({
    internalCode: 2004,
    message: 'Request failed due to invalid input',
    statusCode: statusCodes.BAD_REQUEST,
  }),
  NOT_FOUND: new Code({
    internalCode: 2005,
    message: 'Request failed due to a resource not being found',
    statusCode: statusCodes.NOT_FOUND,
  }),
} as const;

const dbCodes = {
  UNKNOWN: new Code({
    internalCode: 3000,
    message: 'An unknown database error occurred',
  }),
  BAD_CONNECTION: new Code({
    internalCode: 3001,
    message: 'Unable to connect to the database',
  }),
  NOT_FOUND: new Code({
    internalCode: 3002,
    message: 'Object not found',
    statusCode: statusCodes.NOT_FOUND,
  }),
  COULDNT_SAVE: new Code({
    internalCode: 3003,
    message: 'Unable to save object',
  }),
  COULDNT_CREATE: new Code({
    internalCode: 3004,
    message: 'Unable to create object',
  }),
  COULDNT_DELETE: new Code({
    internalCode: 3005,
    message: 'Unable to delete object',
  }),
  COULDNT_UPDATE: new Code({
    internalCode: 3006,
    message: 'Unable to update object',
  }),
} as const;

const validationCodes = {
  UNKNOWN: new Code({
    internalCode: 4000,
    message: 'An unknown validation error occurred',
    statusCode: statusCodes.BAD_REQUEST,
  }),
  INVALID_DATA: new Code({
    internalCode: 4001,
    message: 'Invalid data provided',
    statusCode: statusCodes.BAD_REQUEST,
  }),
  INCORRECT_FORMAT: new Code({
    internalCode: 4002,
    message: 'Incorrect data format',
    statusCode: statusCodes.BAD_REQUEST,
  }),
  MISSING_DATA: new Code({
    internalCode: 4003,
    message: 'Missing required data',
    statusCode: statusCodes.BAD_REQUEST,
  }),
  UNPROCESSABLE: new Code({
    internalCode: 4004,
    message: 'Unable to process data',
    statusCode: statusCodes.UNPROCESSABLE_ENTITY,
  }),
  SYSTEM_CAPACITY: new Code({
    internalCode: 4005,
    message: 'System at capacity',
    statusCode: statusCodes.UNPROCESSABLE_ENTITY,
  }),
} as const;

export const allCodes = {
  ...unknownCodes,
  ...httpCodes,
  ...dbCodes,
  ...validationCodes,
};
const validCodesArr = Object.values(allCodes).map((code) => code.internalCode);
export const validCodes = new Set(validCodesArr);

const errorCodes = {
  unknown: unknownCodes,
  http: httpCodes,
  db: dbCodes,
  validation: validationCodes,
} as const;

export default errorCodes;
