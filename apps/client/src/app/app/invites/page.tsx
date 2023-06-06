'use client';

import { Stack, Text } from '@mantine/core';
import { FC } from 'react';
import PageWrapper from '~/components/PageWrapper';
import HouseholdInvite from '~/features/invite/HouseholdInvite';
import { useInvite } from '~/features/invite/useInvite';

const InvitesPage: FC = () => {
  const { sortedInvites, acceptInvite, declineInvite } = useInvite();

  return (
    <PageWrapper title='Household Invites'>
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
    </PageWrapper>
  );
};

export default InvitesPage;
