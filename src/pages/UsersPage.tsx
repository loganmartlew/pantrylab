import { FC, useEffect, useState } from 'react';
import { Box, Button, Modal, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdPersonAdd } from 'react-icons/md';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import UserCard from '~/features/user/UserCard';
import { Household, User } from '~/types';
import InviteUserForm from '~/features/user/InviteUserForm';
import { supabase } from '~/lib/supabaseClient';

interface Props {}

const sortUsers = (
  household: Household | null,
  pendingUsers: User[]
): { user: User; pending: boolean }[] => {
  if (!household || !household.users) return [];

  const owner = household.users.find(user => user.id === household.owner_id);
  const ownerWithStatus = owner && { user: owner, pending: false };

  const users = household.users.filter(user => user.id !== household.owner_id);
  const usersWithStatus = users.map(user => ({ user, pending: false }));
  const pendingUsersWithStatus = pendingUsers.map(user => ({
    user,
    pending: true,
  }));

  const sortedUsers = [...usersWithStatus, ...pendingUsersWithStatus].sort(
    (a, b) => {
      const aName = `${a.user.first_name} ${a.user.last_name}`;
      const bName = `${b.user.first_name} ${b.user.last_name}`;

      if (aName.toLowerCase() < bName.toLowerCase()) {
        return -1;
      }
      if (aName.toLowerCase() > bName.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  );

  if (!owner) return sortedUsers;
  if (!ownerWithStatus) return sortedUsers;

  return [ownerWithStatus, ...sortedUsers];
};

const UsersPage: FC<Props> = () => {
  const [isInviteModelOpen, inviteModalHandlers] = useDisclosure(false);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  const users = sortUsers(currentHousehold, pendingUsers);
  const isHouseholdOwner = currentHousehold?.owner_id === user?.id;

  useEffect(() => {
    if (!currentHousehold) return;

    supabase
      .from('household_user_invites')
      .select('*, users!inner(*)')
      .eq('household_id', currentHousehold.id)
      .eq('status', 'pending')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log(data);

        const pendingUsers = data?.map(
          (invite: any) => invite.users as User
        ) as User[];

        setPendingUsers(pendingUsers);
      });
  }, [currentHousehold]);

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
            key={householdUser.user.id}
            user={householdUser.user}
            isSelf={user?.id === householdUser.user.id}
            isOwner={currentHousehold?.owner_id === householdUser.user.id}
            isDeleteable={
              isHouseholdOwner && user?.id !== householdUser.user.id
            }
            isPending={householdUser.pending}
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
