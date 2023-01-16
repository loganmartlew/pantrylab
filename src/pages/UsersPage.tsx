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
import ConfirmationModal from '~/components/ConfirmationModal';

interface Props {}

const sortUsers = (
  users: User[],
  pendingUsers: User[],
  ownerId: string = ''
): { user: User; pending: boolean }[] => {
  const owner = users.find(user => user.id === ownerId);
  const ownerWithStatus = owner && { user: owner, pending: false };

  const filteredUsers = users.filter(user => user.id !== ownerId);
  const usersWithStatus = filteredUsers.map(user => ({ user, pending: false }));
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
  const [isConfirmationModalOpen, confirmationModalHandlers] =
    useDisclosure(false);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  const [users, setUsers] = useState<User[]>(currentHousehold?.users || []);

  const sortedUsers = sortUsers(
    users,
    pendingUsers,
    currentHousehold?.owner_id
  );
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

        const pendingUsers = data?.map(
          (invite: any) => invite.users as User
        ) as User[];

        setPendingUsers(pendingUsers);
      });

    const householdUsersChannel = supabase
      .channel('public:household_users')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'household_users',
          filter: `household_id=eq.${currentHousehold.id}`,
        },
        payload => {
          if (payload.eventType === 'DELETE') {
            const deletedUserId = (payload.old as { user_id: string }).user_id;
            setUsers(users => users.filter(user => user.id !== deletedUserId));
            return;
          }

          supabase
            .from('users')
            .select('*')
            .eq('id', payload.new.user_id)
            .then(({ data, error }) => {
              if (error) {
                console.error(error);
                return;
              }

              const user = data?.[0] as User;

              if (payload.eventType === 'INSERT') {
                setUsers(users => [...users, user]);
              }

              if (payload.eventType === 'UPDATE') {
                setUsers(users =>
                  users.map(u => (u.id === user.id ? user : u))
                );
              }
            });
        }
      )
      .subscribe();

    const householdUserInvitesChannel = supabase
      .channel('public:household_user_invites')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'household_user_invites',
          filter: `household_id=eq.${currentHousehold.id}`,
        },
        payload => {
          if (payload.eventType === 'DELETE') {
            const deletedUserId = (payload.old as { user_id: string }).user_id;
            setPendingUsers(users =>
              users.filter(user => user.id !== deletedUserId)
            );
            return;
          }

          if (payload.new.status !== 'pending') {
            return;
          }

          supabase
            .from('users')
            .select('*')
            .eq('id', payload.new.user_id)
            .then(({ data, error }) => {
              if (error) {
                console.error(error);
                return;
              }

              const user = data?.[0] as User;

              if (payload.eventType === 'INSERT') {
                setPendingUsers(users => [...users, user]);
              }

              if (payload.eventType === 'UPDATE') {
                setPendingUsers(users =>
                  users.map(u => (u.id === user.id ? user : u))
                );
              }
            });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(householdUsersChannel);
      supabase.removeChannel(householdUserInvitesChannel);
    };
  }, [currentHousehold]);

  const handleRemoveUser = (id: string) => {
    supabase
      .from('household_users')
      .delete()
      .eq('household_id', currentHousehold?.id)
      .eq('user_id', id)
      .then(({ error }) => {
        if (error) {
          console.error(error);
        }
      });
  };

  const handleRemovePendingUser = (id: string) => {
    supabase
      .from('household_user_invites')
      .delete()
      .eq('household_id', currentHousehold?.id)
      .eq('user_id', id)
      .then(({ error }) => {
        if (error) {
          console.error(error);
        }
      });
  };

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
        {sortedUsers.map(householdUser => (
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
          currentUsers={users}
          currentPendingUsers={pendingUsers}
        />
      </Modal>
    </Box>
  );
};

export default UsersPage;
