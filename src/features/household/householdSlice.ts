import { Household } from '~/types';
import { StoreCreator } from '~/features/store';

export interface HouseholdSlice {
  households: Household[];
  currentHousehold: Household | null;
  setHouseholds: (households: Household[]) => void;
  setCurrentHousehold: (household: Household | null) => void;
}

export const createHouseholdSlice: StoreCreator<HouseholdSlice> = (
  set,
  get
) => ({
  households: [],
  currentHousehold: null,
  setHouseholds: (households: Household[]) => {
    set({ households });
  },
  setCurrentHousehold: (household: Household | null) => {
    set({ currentHousehold: household });
  },
});
