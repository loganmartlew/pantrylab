import { Session } from '@supabase/supabase-js';
import { User } from '~/types';

export interface AuthSlice {
  session: Session | null;
  user: User | null;
}

export const createAuthSlice = (set): AuthSlice => ({
  session: null,
  user: null,
  setSession: (session: Session | null) => {
    set({ session });
    supabase.from('users').select().eq('id', session?.user?.id);
  },
});
