'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuth } from '~/features/auth/useAuth';

interface Props {}

const AppPage: FC<Props> = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const onLogoutClick = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div>
      <h1>{'Home'}</h1>
      <p>Welcome {user?.first_name}</p>
      <button onClick={onLogoutClick}>logout</button>
    </div>
  );
};

export default AppPage;
