import createErrorResponse from './createErrorResponse';

export default function <S extends number>(
  status: S,
  message: string,
  errors?: unknown
) {
  return {
    status,
    body: createErrorResponse<S>(status, message, errors),
  };
}
