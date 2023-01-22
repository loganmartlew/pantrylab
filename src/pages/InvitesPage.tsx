import { Box, Stack, Text, Title } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useAuth } from '~/features/auth/useAuth';
import HouseholdInvite from '~/features/invite/HouseholdInvite';
import { useInvite } from '~/features/invite/useInvite';
import { supabase } from '~/lib/supabaseClient';
import { Household, Invite } from '~/types';

const InvitesPage: FC = () => {
  const { invites, sortedInvites, acceptInvite, declineInvite } = useInvite();

  return (
    <Box p='md'>
      <Title order={1} mb='md'>
        Household Invites
      </Title>
      <Stack>
        {sortedInvites.length < 1 && <Text>You have no pending invites.</Text>}
        {sortedInvites.length >= 1 &&
          sortedInvites.map(invite => (
            <HouseholdInvite
              invite={invite}
              key={invite.id}
              acceptInvite={acceptInvite}
              declineInvite={declineInvite}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default InvitesPage;
