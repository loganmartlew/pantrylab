export default function <S extends number>(
  status: S,
  message: string,
  errors?: unknown
) {
  return {
    status,
    message,
    errors,
  };
}
