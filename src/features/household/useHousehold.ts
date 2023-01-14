import { useContext } from 'react';
import { householdContext, HouseholdContext } from './householdContext';

export const useHousehold = () => {
  return useContext(householdContext) as HouseholdContext;
};
