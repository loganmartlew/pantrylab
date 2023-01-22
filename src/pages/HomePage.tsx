import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentHousehold } = useHousehold();

  const onLogoutClick = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>{currentHousehold?.name || 'Home'}</h1>
      <p>Welcome {user?.first_name}</p>
      <button onClick={onLogoutClick}>logout</button>
    </div>
  );
};

export default HomePage;
