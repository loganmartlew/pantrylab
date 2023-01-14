import { useLocalStorage } from '@mantine/hooks';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { Household } from '~/types';
import { useAuth } from '../auth/useAuth';

export interface HouseholdContext {
  currentHousehold: Household | null;
  households: Household[];
  setCurrentHousehold: (householdId: string) => void;
}

export const householdContext = createContext<Partial<HouseholdContext>>({});

export const HouseholdProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [households, setHouseholds] = useState<Household[]>([]);
  const [currentHouseholdId, setCurrentHouseholdId] = useLocalStorage<string>({
    key: 'currentHousehold',
    defaultValue: '',
  });

  const currentHousehold =
    households.find(household => household.id === currentHouseholdId) || null;

  useEffect(() => {
    if (!user) {
      setHouseholds([]);
      return;
    }

    supabase
      .from('households')
      .select('*, household_users!inner(users(*))')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        if (!data) {
          setHouseholds([]);
          return;
        }

        const householdUsers = data.map(household => {
          return {
            id: household.id,
            name: household.name,
            created_at: household.created_at,
            users: household.household_users.map((hu: any) => hu.users),
          };
        });

        setHouseholds((householdUsers as Household[]) ?? []);
        console.log(householdUsers);
      });
  }, [user]);

  const setCurrentHousehold = (householdId: string) => {
    const householdPresent = households.find(
      household => household.id === householdId
    );

    if (!householdPresent) {
      return;
    }

    setCurrentHouseholdId(householdId);
  };

  const value: HouseholdContext = {
    households,
    currentHousehold,
    setCurrentHousehold,
  };

  return (
    <householdContext.Provider value={value}>
      {children}
    </householdContext.Provider>
  );
};
