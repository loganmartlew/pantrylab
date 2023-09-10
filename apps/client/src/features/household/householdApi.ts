import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { Household, User } from '../../types';

export const getUserHouseholds = async (
  supabase: SupabaseClient,
  userId: string,
) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const households = data.map((household: any) => ({
    id: household.id,
    name: household.name,
    created_at: dayjs(household.created_at).toDate(),
    users: household.users,
    owner_id: household.owner_id,
  })) as Household[];

  return households;
};

export const getHouseholdUsers = async (
  supabase: SupabaseClient,
  householdId: string,
) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const householdUsers = data.map((hu: any) => ({
    id: hu.users.id,
    created_at: dayjs(hu.users.created_at).toDate(),
    email: hu.users.email,
    first_name: hu.users.first_name,
    last_name: hu.users.last_name,
  })) as User[];

  return householdUsers;
};

export const openUserHouseholdsChannel = (
  supabase: SupabaseClient,
  userId: string,
  callback: (payload: unknown) => void,
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
      callback,
    )
    .subscribe();
};
