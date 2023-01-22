import { Household } from '~/types';
import { StoreCreator } from '~/features/store';

export interface HouseholdSlice {
  households: Household[];
  currentHouseholdId: string;
  isLoading: boolean;
  setHouseholds: (households: Household[]) => void;
  addHousehold: (household: Household) => void;
  updateHousehold: (household: Household) => void;
  deleteHousehold: (householdId: string) => void;
  setCurrentHouseholdId: (householdId: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const createHouseholdSlice: StoreCreator<HouseholdSlice> = (
  set,
  get
) => ({
  households: [],
  currentHouseholdId: '',
  isLoading: true,
  setHouseholds: (households: Household[]) => {
    set({ households });
    set({ isLoading: false });
  },
  addHousehold: (household: Household) => {
    set(state => ({
      households: [...state.households, household],
    }));
  },
  updateHousehold: (household: Household) => {
    set(state => ({
      households: state.households.map(h => {
        if (h.id === household.id) {
          return household;
        }
        return h;
      }),
    }));
  },
  deleteHousehold: (householdId: string) => {
    set(state => ({
      households: state.households.filter(h => h.id !== householdId),
    }));
  },
  setCurrentHouseholdId: (householdId: string) => {
    set({ currentHouseholdId: householdId });
    localStorage.setItem('currentHouseholdId', householdId);
  },
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
});
