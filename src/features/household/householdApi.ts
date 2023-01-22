import { supabase } from '~/lib/supabaseClient';

export const getUserHouseholds = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from('households')
    .select('*, household_users!inner(users(*))')
    .eq('household_users.user_id', userId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const householdUsers = data.map(household => {
    return {
      id: household.id,
      name: household.name,
      created_at: household.created_at,
      owner_id: household.owner_id,
      users: household.household_users.map((hu: any) => hu.users),
    };
  });

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
