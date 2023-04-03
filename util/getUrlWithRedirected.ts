import { ReadonlyURLSearchParams } from 'next/navigation';

export const getUrlWithRedirected = (
  target: string,
  startRedirects: boolean,
  params: ReadonlyURLSearchParams | null,
  pathname: string | null
) => {
  const redirectedFrom = params?.get('redirectedFrom');

  if (!startRedirects && !redirectedFrom) {
    return target;
  }

  return `${target}?redirectedFrom=${redirectedFrom ?? pathname}`;
};
