'use client';

import Link from 'next/link';
import { useAuth } from '~/features/auth/useAuth';

export default function Page() {
  const { logout, isAuth } = useAuth();

  return (
    <div>
      <p>Hello {isAuth ? 'authed' : 'unauthed'}</p>
      {isAuth ? (
        <button onClick={() => logout()}>Log Out</button>
      ) : (
        <Link href='/auth/login'>Log In</Link>
      )}
      <Link href='/app'>Go to app</Link>
    </div>
  );
}
