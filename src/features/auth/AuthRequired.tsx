import { FC } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

interface Props {}

const AuthRequired: FC<Props> = () => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    console.log('AUTH: ', isAuthenticated);
    return <Navigate to={`/login?redirectTo=${location.pathname}`} />;
  }

  return <Outlet />;
};

export default AuthRequired;
