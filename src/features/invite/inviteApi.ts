import { Select } from '@mantine/core';
import { supabase } from '~/lib/supabaseClient';
import { Invite } from '~/types';

export const getUserInvites = async (userId: string) => {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from('household_user_invites')
    .select('*, households!inner(*)')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const invites = data.map(invite => ({
    id: invite.id,
    created_at: invite.created_at,
    household_id: invite.household_id,
    household: invite.households,
    status: invite.status,
    user_id: invite.user_id,
  })) as Invite[];

  return invites;
};

export const updateInviteStatus = async (
  inviteId: string,
  status: 'pending' | 'accepted' | 'declined'
) => {
  const { error } = await supabase
    .from('household_user_invites')
    .update({ status })
    .eq('id', inviteId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const openUserInvitesChannel = (
  userId: string,
  callback: (payload: unknown) => void
) => {
  return supabase
    .channel('public:household_user_invites:user')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'household_user_invites',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};
