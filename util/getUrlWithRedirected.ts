import { ReadonlyURLSearchParams } from 'next/navigation';

export const getUrlWithRedirected = (
  target: string,
  params: ReadonlyURLSearchParams | null,
  pathname: string | null
) => {
  const redirectedFrom = params?.get('redirectedFrom');

  if (!redirectedFrom) return target;

  return `${target}?redirectedFrom=${redirectedFrom ?? pathname}`;
};
