'use client';

import { FC, ReactNode, useEffect } from 'react';
import LoadingScreen from '~/components/LoadingScreen';
import { useAuth } from './useAuth';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getUrlWithRedirected } from '~/util/getUrlWithRedirected';

interface Props {
  children: ReactNode;
}

const AuthRequired: FC<Props> = ({ children }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { isAuth, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      router.push(getUrlWithRedirected('/', params, pathname));
    }
  }, [isAuth, isLoading, params, pathname, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthRequired;
