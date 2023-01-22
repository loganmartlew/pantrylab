import { Box, Stack, Text, Title } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useAuth } from '~/features/auth/useAuth';
import HouseholdInvite from '~/features/invite/HouseholdInvite';
import { supabase } from '~/lib/supabaseClient';
import { Household, Invite } from '~/types';

const InvitesPage: FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);

  const { user } = useAuth();

  const sortedInvites = invites.sort((a, b) => {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    if (!user) return;

    supabase
      .from('household_user_invites')
      .select('*, households!inner(*)')
      .eq('user_id', user.id)
      .eq('status', 'pending')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        const invites = data?.map(
          (invite: any) =>
            ({
              id: invite.id,
              household: invite.households,
              household_id: invite.household_id,
              user_id: invite.user_id,
              created_at: invite.created_at,
            } as Invite)
        ) as Invite[];

        setInvites(invites);
      });

    const householdUserInvitesChannel = supabase
      .channel('public:household_user_invites')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'household_user_invites',
          filter: `user_id=eq.${user.id}`,
        },
        payload => {
          if (payload.eventType === 'DELETE') {
            const deletedInviteId = (payload.old as { id: string }).id;
            setInvites(invites =>
              invites.filter(invite => invite.id !== deletedInviteId)
            );
            return;
          }

          const invite = payload.new as Invite;

          if (payload.new.status !== 'pending') {
            return;
          }

          supabase
            .from('households')
            .select('*')
            .eq('id', invite.household_id)
            .then(({ data, error }) => {
              if (error) {
                console.error(error);
                return;
              }

              const household = data?.[0] as Household;

              const fullInvite = {
                ...invite,
                household,
              };

              if (payload.eventType === 'INSERT') {
                setInvites(invites => [...invites, fullInvite]);
              }

              if (payload.eventType === 'UPDATE') {
                setInvites(invites =>
                  invites.map(i => (i.id === invite.id ? invite : i))
                );
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(householdUserInvitesChannel);
    };
  }, [user]);

  return (
    <Box p='md'>
      <Title order={1} mb='md'>
        Household Invites
      </Title>
      <Stack>
        {sortedInvites.length < 1 && <Text>You have no pending invites.</Text>}
        {sortedInvites.length >= 1 &&
          sortedInvites.map(invite => (
            <HouseholdInvite invite={invite} key={invite.id} />
          ))}
      </Stack>
    </Box>
  );
};

export default InvitesPage;
