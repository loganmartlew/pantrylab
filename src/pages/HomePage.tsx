import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/features/auth/useAuth';
import { supabase } from '~/lib/supabaseClient';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate('/login');
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome {user?.first_name}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomePage;
