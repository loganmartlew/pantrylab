'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Page() {
  const { data, status } = useSession();

  console.log(data);

  return (
    <div>
      <p>Hello {data ? 'authed' : 'unauthed'}</p>
      {data ? (
        <button onClick={() => signOut()}>Log Out</button>
      ) : (
        <button onClick={() => signIn()}>Log In</button>
      )}
    </div>
  );
}
