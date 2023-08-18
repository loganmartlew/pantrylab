export interface ErrorResponse<S extends number> {
  status: S;
  message: string;
  errors?: unknown;
}
