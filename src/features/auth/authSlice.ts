import { Session } from '@supabase/supabase-js';
import { User } from '~/types';
import { Store, StoreCreator } from '~/features/store';
import { getUser } from './authApi';

export interface AuthSlice {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
}

export const createAuthSlice: StoreCreator<Store['auth']> = (set, get) => ({
  session: null,
  user: null,
  setSession: async (session: Session | null) => {
    set({ session });
    set({ user: await getUser(session?.user?.id ?? '') });
  },
});
