import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice } from '~/features/auth/authSlice';
import { User } from '~/types';

export interface Store {
  auth: {
    session: Session | null;
    user: User | null;
    setSession: (session: Session | null) => void;
  };
}

type Get = () => Store;
type Set = <
  A extends
    | string
    | {
        type: unknown;
      }
>(
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined,
  action?: A | undefined
) => void;

type NewState<T> = Partial<T> | ((state: T) => Partial<T>);

type SetMerge<T> = (newState: NewState<T>) => void;

export type StoreCreator<T> = (set: SetMerge<T>, get: Get) => T;

const createSlice = (
  sliceFn: StoreCreator<Store[typeof sliceName]>,
  sliceName: keyof Store,
  set: Set,
  get: Get
) => {
  function setMerge(newState: NewState<Store[typeof sliceName]>) {
    if (typeof newState === 'function') {
      set(state => ({
        [sliceName]: { ...state[sliceName], ...newState(state[sliceName]) },
      }));
    } else {
      set(state => ({ [sliceName]: { ...state[sliceName], ...newState } }));
    }
  }

  return sliceFn(setMerge, get);
};

export const useStore = create<Store>()(
  devtools<Store>((set, get) => ({
    auth: createSlice(createAuthSlice, 'auth', set, get),
  }))
);
