'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAuth } from '~/features/auth/useAuth';

interface Props {}

const AppPage: FC<Props> = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>{'Home'}</h1>
      <p>Welcome {user?.first_name}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default AppPage;
