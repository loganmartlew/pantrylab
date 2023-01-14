import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import { supabase } from '~/lib/supabaseClient';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

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
      <h1>{currentHousehold?.name || 'Home'}</h1>
      <p>Welcome {user?.first_name}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default HomePage;
