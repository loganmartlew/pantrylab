import { supabase } from '~/lib/supabaseClient';
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

  const user = data.find(u => u.id === id) as User;

  return user;
};
