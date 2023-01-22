import { supabase } from '~/lib/supabaseClient';
import { Household, User } from '~/types';

export const getUserHouseholds = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_user_households', {
    _user_id: userId,
  });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  return data as Household[];
};

export const getHouseholdUsers = async (householdId: string) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('household_users')
    .select('*, users!inner(*)')
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const householdUsers = data.map((hu: any) => hu.users) as User[];

  return householdUsers;
};

export const openUserHouseholdsChannel = (
  userId: string,
  callback: (payload: unknown) => void
) => {
  return supabase
    .channel('public:household_users')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'household_users',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};
