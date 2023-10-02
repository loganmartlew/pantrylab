import { AxiosResponse } from 'axios';

export function formatHeaders(headers: AxiosResponse['headers']) {
  const newHeaders = new Headers();
  for (const [key, value] of Object.entries(headers)) {
    newHeaders.set(key, value as string);
  }

  return newHeaders;
}
