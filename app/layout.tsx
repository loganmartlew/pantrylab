'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Providers from './providers';

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang='en-US'>
      <head />
      <body>
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
