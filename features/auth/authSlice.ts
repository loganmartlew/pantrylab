import { Session } from '@supabase/supabase-js';
import { User } from '~/types';
import { NewState, StoreCreator, storeMergeSet } from '~/features/store';

export interface AuthSlice {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const createAuthSlice: StoreCreator<AuthSlice> = (set, get) => ({
  session: null,
  user: null,
  isLoading: false,
  setSession: async (session: Session | null) => {
    set({ session });
  },
  setUser: (user: User | null) => {
    set({ user });
  },
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
});
