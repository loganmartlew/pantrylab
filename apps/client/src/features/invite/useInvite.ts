import { useEffect, useCallback, useMemo } from 'react';
import { useStore } from '~/features/store';
import { useAuth } from '~/features/auth/useAuth';
import {
  getUserInvites,
  openUserInvitesChannel,
  updateInviteStatus,
} from './inviteApi';
import { Invite } from '~/types';
import { useSupabase } from '~/lib/supabase';

export const useInvite = () => {
  const { supabase } = useSupabase();

  const { invites, setInvites, updateInvite } = useStore((s) => s.invite);

  const { user } = useAuth();

  const sortedInvites = useMemo(() => {
    return invites.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return -1;
      }
      if (a.created_at > b.created_at) {
        return 1;
      }
      return 0;
    });
  }, [invites]);

  const hasPendingInvites = invites.some(
    (invite) => invite.status === 'pending'
  );

  useEffect(() => {
    if (!user) {
      setInvites([]);
      return;
    }

    getUserInvites(supabase, user.id).then((invites) => {
      setInvites(invites);
    });

    const userInvitesChannel = openUserInvitesChannel(supabase, user.id, () => {
      getUserInvites(supabase, user.id).then((invites) => {
        setInvites(invites);
      });
    });

    return () => {
      supabase.removeChannel(userInvitesChannel);
    };
  }, [user, supabase, setInvites]);

  const acceptInvite = useCallback(
    async (invite: Invite) => {
      const oldInvites = [...invites];
      updateInvite({ ...invite, status: 'accepted' });

      const error = await updateInviteStatus(supabase, invite.id, 'accepted');

      if (error) {
        setInvites(oldInvites);
      }
    },
    [invites, setInvites, updateInvite, supabase]
  );

  const declineInvite = useCallback(
    async (invite: Invite) => {
      const oldInvites = [...invites];
      updateInvite({ ...invite, status: 'declined' });

      const error = await updateInviteStatus(supabase, invite.id, 'declined');

      if (error) {
        setInvites(oldInvites);
      }
    },
    [invites, setInvites, updateInvite, supabase]
  );

  return {
    invites,
    sortedInvites,
    hasPendingInvites,
    acceptInvite,
    declineInvite,
  };
};
