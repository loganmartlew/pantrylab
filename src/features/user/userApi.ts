import { supabase } from '~/lib/supabaseClient';
import { User } from '~/types';

export const getUser = async (userId: string) => {
  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const user = data.find(u => u.id === userId) as User;

  return user;
};

export const getPendingUsers = async (householdId: string) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('household_user_invites')
    .select('*, users!inner(*)')
    .eq('household_id', householdId)
    .eq('status', 'pending');

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const pendingUsers = data.map(
    (invite: any) => invite.users as User
  ) as User[];

  return pendingUsers;
};

export const deleteUserFromHousehold = async (
  userId: string,
  householdId: string
) => {
  if (!userId) {
    return;
  }

  const { error } = await supabase
    .from('household_users')
    .delete()
    .eq('user_id', userId)
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const deletePendingUserFromHousehold = async (
  userId: string,
  householdId: string
) => {
  if (!userId || !householdId) {
    return;
  }

  const { error } = await supabase
    .from('household_user_invites')
    .delete()
    .eq('user_id', userId)
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const inviteUsersToHousehold = async (
  users: User[],
  householdId: string
) => {
  if (!users || !householdId) {
    return;
  }

  const { error } = await supabase.from('household_user_invites').insert(
    users.map(user => ({
      user_id: user.id,
      household_id: householdId,
    }))
  );

  if (error) {
    console.error(error);
  }

  return error;
};

export const openHouseholdUsersChannel = (
  householdId: string,
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
        filter: `household_id=eq.${householdId}`,
      },
      callback
    )
    .subscribe();
};

export const openHouseholdUserInvitesChannel = (
  householdId: string,
  callback: (payload: unknown) => void
) => {
  return supabase
    .channel('public:household_user_invites:household')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'household_user_invites',
        filter: `household_id=eq.${householdId}`,
      },
      callback
    )
    .subscribe();
};
