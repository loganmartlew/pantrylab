import { useLocalStorage } from '@mantine/hooks';
import { createContext, FC, ReactNode, useEffect, useReducer } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { Household } from '~/types';
import { useAuth } from '../auth/useAuth';

export interface HouseholdContext {
  currentHousehold: Household | null;
  households: Household[];
  setCurrentHousehold: (householdId: string) => void;
}

export const householdContext = createContext<Partial<HouseholdContext>>({});

interface HouseholdUsersPayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  event: 'INSERT' | 'UPDATE' | 'DELETE';
  new: {
    id: string;
    household_id: string;
    user_id: string;
  };
}

type HouseholdAction =
  | {
      payload: Household;
      type: 'INSERT' | 'UPDATE' | 'DELETE';
    }
  | {
      payload: Household[];
      type: 'SET';
    };

const householdReducer = (state: Household[], action: HouseholdAction) => {
  const reduce = (state: Household[], action: HouseholdAction) => {
    switch (action.type) {
      case 'INSERT':
        return [...state, action.payload];
      case 'UPDATE':
        return [
          ...state.filter(household => household.id !== action.payload.id),
          action.payload,
        ];
      case 'DELETE':
        return state.filter(household => household.id !== action.payload.id);
      case 'SET':
        return action.payload;
      default:
        return state;
    }
  };

  const newState = reduce(state, action);
  const sortedState = [...newState].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return sortedState;
};

export const HouseholdProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [households, dispatchHouseholds] = useReducer(householdReducer, []);
  const [currentHouseholdId, setCurrentHouseholdId] = useLocalStorage<string>({
    key: 'currentHousehold',
    defaultValue: '',
  });

  const currentHousehold =
    households.find(household => household.id === currentHouseholdId) || null;

  useEffect(() => {
    if (!user) {
      dispatchHouseholds({ type: 'SET', payload: [] });
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
          dispatchHouseholds({ type: 'SET', payload: [] });
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

        dispatchHouseholds({
          type: 'SET',
          payload: (householdUsers as Household[]) ?? [],
        });

        if (householdUsers.length > 0) {
          setCurrentHouseholdId(householdUsers[0].id);
        }
      });

    const householdUsersChannel = supabase
      .channel('public:household_users')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'household_users',
          filter: `user_id=eq.${user?.id}`,
        },
        payload => {
          if (payload.eventType === 'DELETE') {
            dispatchHouseholds({
              type: payload.eventType,
              payload: {
                id: (payload.new as { household_id: string }).household_id,
              } as Household,
            });
            return;
          }

          supabase
            .from('households')
            .select('*, household_users!inner(users(*))')
            .eq('id', (payload.new as { household_id: string }).household_id)
            .then(({ data, error }) => {
              if (error) {
                console.error(error);
                return;
              }

              if (!data) {
                return;
              }

              const household = data[0];

              const householdUser = {
                id: household.id,
                name: household.name,
                created_at: household.created_at,
                users: household.household_users.map((hu: any) => hu.users),
              };

              dispatchHouseholds({
                type: payload.eventType,
                payload: householdUser,
              });
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(householdUsersChannel);
    };
  }, [user]);

  const setCurrentHousehold = (householdId: string) => {
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
