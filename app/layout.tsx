import 'server-only';
import SupabaseListener from '~/lib/supabase/SupabaseListener';
import SupabaseProvider from '~/lib/supabase/SupabaseProvider';
import { createClient } from '~/lib/supabase/supabaseServer';

import Providers from './providers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <head />
      <body>
        <SupabaseProvider>
          <Providers>
            <SupabaseListener serverAccessToken={session?.access_token} />
            {children}
          </Providers>
        </SupabaseProvider>
      </body>
    </html>
  );
}
