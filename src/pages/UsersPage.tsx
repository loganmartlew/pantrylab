import { Box, Button, Stack, Title } from '@mantine/core';
import { FC } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import UserCard from '~/features/user/UserCard';
import { Household, User } from '~/types';

interface Props {}

const sortUsers = (household: Household | null): User[] => {
  if (!household || !household.users) return [];

  const owner = household.users.find(user => user.id === household.owner_id);
  const users = household.users.filter(user => user.id !== household.owner_id);

  const sortedUsers = [...users].sort((a, b) => {
    const aName = `${a.first_name} ${a.last_name}`;
    const bName = `${b.first_name} ${b.last_name}`;

    if (aName.toLowerCase() < bName.toLowerCase()) {
      return -1;
    }
    if (aName.toLowerCase() > bName.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  if (!owner) return sortedUsers;

  return [owner, ...sortedUsers];
};

const UsersPage: FC<Props> = () => {
  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  const users = sortUsers(currentHousehold);
  const isHouseholdOwner = currentHousehold?.owner_id === user?.id;

  return (
    <Box p='md'>
      <Title order={1}>Users</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
      <Stack>
        {isHouseholdOwner && (
          <Button variant='light' leftIcon={<MdPersonAdd />}>
            Invite User
          </Button>
        )}
        {users.map(householdUser => (
          <UserCard
            user={householdUser}
            isSelf={user?.id === householdUser.id}
            isOwner={currentHousehold?.owner_id === householdUser.id}
            isDeleteable={isHouseholdOwner && user?.id !== householdUser.id}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default UsersPage;
