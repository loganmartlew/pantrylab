import { useEffect, useCallback } from 'react';
import { useStore } from '../../features/store';
import { useAuth } from '../../features/auth/useAuth';
import { getUserHouseholds, openUserHouseholdsChannel } from './householdApi';
import { useSupabase } from '../../lib/supabase';

export const useHousehold = () => {
  const { supabase } = useSupabase();

  const {
    households,
    currentHouseholdId,
    isLoading,
    setHouseholds,
    setCurrentHouseholdId: setCurrentHouseholdIdAction,
  } = useStore((s) => s.household);

  const { user } = useAuth();

  const currentHousehold =
    households.find((household) => household.id === currentHouseholdId) || null;

  const setCurrentHouseholdId = useCallback(
    (householdId: string) => {
      setCurrentHouseholdIdAction(householdId);
      getUserHouseholds(supabase, user?.id || '').then((households) => {
        setHouseholds(households);
      });
    },
    [setCurrentHouseholdIdAction, supabase, user, setHouseholds]
  );

  useEffect(() => {
    if (!user) {
      setHouseholds([]);
      return;
    }

    getUserHouseholds(supabase, user.id).then((households) => {
      setHouseholds(households);

      if (households.length > 0 && !currentHouseholdId) {
        const newCurrentHouseholdId =
          localStorage.getItem('currentHouseholdId') || '';

        if (newCurrentHouseholdId) {
          setCurrentHouseholdId(newCurrentHouseholdId);
        } else {
          setCurrentHouseholdId(households[0].id);
        }
      }
    });

    const channel = openUserHouseholdsChannel(supabase, user.id, () => {
      getUserHouseholds(supabase, user.id).then((households) => {
        setHouseholds(households);
      });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [
    user,
    supabase,
    setHouseholds,
    currentHouseholdId,
    setCurrentHouseholdId,
  ]);

  return {
    households,
    currentHousehold,
    isLoading,
    setHouseholds,
    setCurrentHouseholdId,
  };
};
