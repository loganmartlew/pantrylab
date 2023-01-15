import { Box, Stack, Title } from '@mantine/core';
import { FC } from 'react';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import UserCard from '~/features/user/UserCard';

interface Props {}

const UsersPage: FC<Props> = () => {
  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  return (
    <Box p='md'>
      <Title order={1}>Users</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
      <Stack>
        {currentHousehold?.users.map(householdUser => (
          <UserCard
            user={householdUser}
            isSelf={user?.id === householdUser.id}
            isOwner={currentHousehold.owner_id === householdUser.id}
            isDeleteable={currentHousehold.owner_id === user?.id}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default UsersPage;
