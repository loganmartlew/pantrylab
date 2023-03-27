'use client';

import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import LoadingScreen from '~/components/LoadingScreen';
import { useAuth } from '~/features/auth/useAuth';

interface Props {
  children: ReactNode;
}

const AuthRequired: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { user, session, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if ((!user || !session) && !isLoading) {
    router.push(`/login?redirectTo=${router.pathname}`);
    return null;
  }

  return <>{children}</>;
};

export default AuthRequired;
