'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import { getUrlWithRedirected } from '../../util/getUrlWithRedirected';
import { useAuth } from './useAuth';

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
        getUrlWithRedirected('/confirmemail', true, params, pathname),
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
