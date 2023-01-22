import { useEffect, useCallback, useMemo } from 'react';
import { useStore } from '~/features/store';
import { useAuth } from '~/features/auth/useAuth';
import { supabase } from '~/lib/supabaseClient';
import {
  getUserInvites,
  openUserInvitesChannel,
  updateInviteStatus,
} from './inviteApi';
import { Invite } from '~/types';

export const useInvite = () => {
  const { invites, setInvites, addInvite, updateInvite, deleteInvite } =
    useStore(s => s.invite);

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

  const hasPendingInvites = invites.some(invite => invite.status === 'pending');

  useEffect(() => {
    if (!user) {
      setInvites([]);
      return;
    }

    getUserInvites(user.id).then(invites => {
      setInvites(invites);
    });

    const userInvitesChannel = openUserInvitesChannel(user.id, () => {
      getUserInvites(user.id).then(invites => {
        setInvites(invites);
      });
    });

    return () => {
      supabase.removeChannel(userInvitesChannel);
    };
  }, [user]);

  const acceptInvite = useCallback(
    async (invite: Invite) => {
      const oldInvites = [...invites];
      updateInvite({ ...invite, status: 'accepted' });

      const error = await updateInviteStatus(invite.id, 'accepted');

      if (error) {
        setInvites(oldInvites);
      }
    },
    [invites]
  );

  const declineInvite = useCallback(
    async (invite: Invite) => {
      const oldInvites = [...invites];
      updateInvite({ ...invite, status: 'declined' });

      const error = await updateInviteStatus(invite.id, 'declined');

      if (error) {
        setInvites(oldInvites);
      }
    },
    [invites]
  );

  return {
    invites,
    sortedInvites,
    hasPendingInvites,
    acceptInvite,
    declineInvite,
  };
};
