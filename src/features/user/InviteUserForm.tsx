import { Box } from '@mantine/core';
import { FC } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import { supabase } from '~/lib/supabaseClient';
import { User } from '~/types';
import { useAuth } from '../auth/useAuth';
import UserInviteCard from './UserInviteCard';

interface Props {
  onClose?: () => void;
}

const InviteUserForm: FC<Props> = ({ onClose }) => {
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

  return (
    <Box component='form'>
      <DebouncedTextSearch<User>
        label='Email Address'
        placeholder='Users email address'
        fetchData={searchUsers}
        render={(result, clearSearch) => (
          <UserInviteCard key={result.id} user={result} />
        )}
      />
    </Box>
  );
};

export default InviteUserForm;
