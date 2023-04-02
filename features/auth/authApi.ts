import dayjs from 'dayjs';
import { supabase } from '~/lib/supabase/supabaseClient';
import { User } from '~/types';

export const getUser = async (id: string) => {
  if (!id) {
    return null;
  }

  const { data, error } = await supabase.from('users').select().eq('id', id);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const userData = data.find(u => u.id === id) as User;

  const user = {
    id: userData.id,
    created_at: dayjs(userData.created_at).toDate(),
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
  };

  return user;
};
