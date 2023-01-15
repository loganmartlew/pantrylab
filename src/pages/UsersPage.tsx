import { Box, Button, Stack, Title } from '@mantine/core';
import { FC } from 'react';
import { MdPersonAdd } from 'react-icons/md';
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
        <Button variant='light' leftIcon={<MdPersonAdd />}>
          Invite User
        </Button>
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
