'use client';

import { FC, ReactNode } from 'react';
import LoadingScreen from '~/components/LoadingScreen';
import { useAuth } from './useAuth';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const AuthRequired: FC<Props> = ({ children }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuth) {
    router.push(
      `/${
        params?.get('redirectedFrom')
          ? `redirectedFrom=${params?.get('redirectedFrom')}`
          : `redirectedFrom=${pathname}`
      }`
    );

    return null;
  }

  return <>{children}</>;
};

export default AuthRequired;
