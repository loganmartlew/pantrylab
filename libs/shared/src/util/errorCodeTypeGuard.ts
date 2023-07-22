export default function isErrorWithCode(
  error: unknown
): error is { code: string } {
  return typeof error === 'object' && !!error && 'code' in error;
}
