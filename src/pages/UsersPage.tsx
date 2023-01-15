import { FC } from 'react';
import { Box, Button, Modal, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdPersonAdd } from 'react-icons/md';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import UserCard from '~/features/user/UserCard';
import { Household, User } from '~/types';
import InviteUserForm from '~/features/user/InviteUserForm';

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
  const [isInviteModelOpen, inviteModalHandlers] = useDisclosure(false);

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
          <Button
            variant='light'
            leftIcon={<MdPersonAdd />}
            onClick={inviteModalHandlers.open}
          >
            Invite Users
          </Button>
        )}
        {users.map(householdUser => (
          <UserCard
            key={householdUser.id}
            user={householdUser}
            isSelf={user?.id === householdUser.id}
            isOwner={currentHousehold?.owner_id === householdUser.id}
            isDeleteable={isHouseholdOwner && user?.id !== householdUser.id}
          />
        ))}
      </Stack>
      <Modal
        title='Invite Users'
        opened={isInviteModelOpen}
        onClose={inviteModalHandlers.close}
      >
        <InviteUserForm onClose={inviteModalHandlers.close} />
      </Modal>
    </Box>
  );
};

export default UsersPage;
