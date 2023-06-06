'use client';

import { FC } from 'react';
import { Button, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MdPersonAdd } from 'react-icons/md';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import UserCard from '~/features/user/UserCard';
import InviteUserForm from '~/features/user/InviteUserForm';
import { useHouseholdUsers } from '~/features/user/useHouseholdUsers';
import { User } from '~/types';
import PageWrapper from '~/components/PageWrapper';

const UsersPage: FC = () => {
  const [isInviteModelOpen, inviteModalHandlers] = useDisclosure(false);

  const { user } = useAuth();
  const { currentHousehold } = useHousehold();
  const {
    users,
    isHouseholdOwner,
    removeUser,
    removePendingUser,
    inviteUsers,
    searchUsersToInvite,
  } = useHouseholdUsers(currentHousehold?.id || '');

  const handleRemoveUser = async (id: string) => {
    await removeUser(id);
  };

  const handleRemovePendingUser = async (id: string) => {
    await removePendingUser(id);
  };

  const handleInviteUsers = async (users: User[]) => {
    await inviteUsers(users);
  };

  return (
    <PageWrapper title='Users' subtitle={currentHousehold?.name}>
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
        {users.map((householdUser) => (
          <UserCard
            key={householdUser.user.id}
            user={householdUser.user}
            isSelf={user?.id === householdUser.user.id}
            isOwner={currentHousehold?.owner_id === householdUser.user.id}
            isDeleteable={
              isHouseholdOwner && user?.id !== householdUser.user.id
            }
            isPending={householdUser.pending}
            onDelete={
              householdUser.pending ? handleRemovePendingUser : handleRemoveUser
            }
          />
        ))}
      </Stack>
      <Modal
        title='Invite Users'
        opened={isInviteModelOpen}
        onClose={inviteModalHandlers.close}
      >
        <InviteUserForm
          onClose={inviteModalHandlers.close}
          searchUsers={searchUsersToInvite}
          onSubmit={handleInviteUsers}
        />
      </Modal>
    </PageWrapper>
  );
};

export default UsersPage;
