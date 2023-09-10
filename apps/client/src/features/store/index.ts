import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  createHouseholdSlice,
  HouseholdSlice,
} from '../household/householdSlice';
import { createInviteSlice, InviteSlice } from '../invite/inviteSlice';

export interface Store {
  household: HouseholdSlice;
  invite: InviteSlice;
}
type StoreKeys = keyof Store;
type Slices = Store[StoreKeys];

type Get = () => Store;
type Set = <
  A extends
    | string
    | {
        type: unknown;
      },
>(
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined,
  action?: A | undefined,
) => void;

export type NewState<T> = Partial<T> | ((state: T) => Partial<T>);

export type StoreCreator<T = Slices> = (
  set: ReturnType<typeof storeMergeSet<T>>,
  get: Get,
) => T;

export const storeMergeSet = <T = Slices>(
  sliceName: StoreKeys,
  storeSet: Set,
) => {
  return (newState: NewState<T>) => {
    if (typeof newState === 'function') {
      storeSet((state) => ({
        [sliceName]: {
          ...state[sliceName],
          ...newState(state[sliceName] as T),
        },
      }));
    } else {
      storeSet((state) => ({
        [sliceName]: {
          ...state[sliceName],
          ...newState,
        },
      }));
    }
  };
};

const createSlice = <T = Slices>(
  sliceName: StoreKeys,
  sliceFn: StoreCreator<T>,
  set: Set,
  get: Get,
) => {
  const mergeSet = storeMergeSet<T>(sliceName, set);
  return sliceFn(mergeSet, get);
};

export const useStore = create<Store>()(
  devtools<Store>((set, get) => ({
    household: createSlice<HouseholdSlice>(
      'household',
      createHouseholdSlice,
      set,
      get,
    ),
    invite: createSlice<InviteSlice>('invite', createInviteSlice, set, get),
  })),
);
