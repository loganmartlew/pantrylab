import 'server-only';
import SupabaseProvider from '~/lib/supabase/SupabaseProvider';

import Providers from './providers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body>
        <SupabaseProvider>
          <Providers>{children}</Providers>
        </SupabaseProvider>
      </body>
    </html>
  );
}
