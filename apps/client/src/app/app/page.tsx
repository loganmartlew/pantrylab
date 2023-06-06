'use client';

import { FC } from 'react';
import { useAuth } from '~/features/auth/useAuth';

const AppPage: FC = () => {
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
