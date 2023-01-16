import { Box, Button, Stack } from '@mantine/core';
import { FC, FormEvent, useState } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import { supabase } from '~/lib/supabaseClient';
import { User } from '~/types';
import { useAuth } from '../auth/useAuth';
import { useHousehold } from '../household/useHousehold';
import UserInviteCard from './UserInviteCard';

interface Props {
  onClose?: () => void;
  currentUsers: User[];
  currentPendingUsers: User[];
}

const InviteUserForm: FC<Props> = ({
  onClose,
  currentUsers,
  currentPendingUsers,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  const searchUsers = async (searchTerm: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .neq('id', user?.id)
      .like('email', `%${searchTerm}%`);

    if (error) {
      console.error(error);
      return [];
    }

    if (!data) return [];

    const users = data as User[];

    const filteredUsers = users.filter(
      user =>
        !currentUsers.find(u => u.id === user.id) &&
        !currentPendingUsers.find(u => u.id === user.id)
    );

    return filteredUsers;
  };

  const addUser = (user: User) => {
    setUsers((prevUsers: User[]) => [...prevUsers, user]);
  };

  const removeUser = (id: string) => {
    setUsers((prevUsers: User[]) => prevUsers.filter(user => user.id !== id));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const invites = users.map(user => ({
      user_id: user.id,
      household_id: currentHousehold?.id,
    }));

    const { error } = await supabase
      .from('household_user_invites')
      .insert(invites);

    if (error) {
      console.error(error);
      return;
    }

    setUsers([]);
    if (onClose) onClose();
  };

  return (
    <Box component='form' autoComplete='off' onSubmit={submit}>
      <Stack>
        <DebouncedTextSearch<User>
          label='Email Address'
          placeholder='Users email address'
          fetchData={searchUsers}
          render={(result, clearSearch) => (
            <UserInviteCard
              key={result.id}
              user={result}
              onClick={() => {
                addUser(result);
                clearSearch();
              }}
            />
          )}
        />
        <Stack>
          {users.map(user => (
            <UserInviteCard
              key={user.id}
              user={user}
              isDeleteable
              onDelete={removeUser}
            />
          ))}
        </Stack>
        {users.length > 0 && <Button type='submit'>Invite Users</Button>}
      </Stack>
    </Box>
  );
};

export default InviteUserForm;
