import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '@pantrylab/shared/types';

export const c: ReturnType<typeof initContract> = initContract();

export const defaultResponses = {
  400: c.type<ErrorResponse<400>>(),
};

export const authErrors = {
  401: c.type<ErrorResponse<401>>(),
  403: c.type<ErrorResponse<403>>(),
};

export const notFoundErrors = {
  404: c.type<ErrorResponse<404>>(),
};
