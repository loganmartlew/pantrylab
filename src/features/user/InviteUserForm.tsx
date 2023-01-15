import { Box, Button, Stack } from '@mantine/core';
import { FC, FormEvent, useState } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import { supabase } from '~/lib/supabaseClient';
import { User } from '~/types';
import { useAuth } from '../auth/useAuth';
import UserInviteCard from './UserInviteCard';

interface Props {
  onClose?: () => void;
}

const InviteUserForm: FC<Props> = ({ onClose }) => {
  const [users, setUsers] = useState<User[]>([]);

  const { user } = useAuth();

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

    return data as User[];
  };

  const addUser = (user: User) => {
    setUsers((prevUsers: User[]) => [...prevUsers, user]);
  };

  const removeUser = (id: string) => {
    setUsers((prevUsers: User[]) => prevUsers.filter(user => user.id !== id));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box component='form'>
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
