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
  const { isAuth, isLoading, isVerified } = useAuth();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      router.push(getUrlWithRedirected('/', true, params, pathname));
      return;
    }

    if (!isVerified && !isLoading) {
      router.push(
        getUrlWithRedirected('/confirmemail', true, params, pathname)
      );
      return;
    }
  }, [isAuth, isLoading, params, pathname, router, isVerified]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthRequired;
