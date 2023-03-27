import { FC } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import { useAuth } from './useAuth';

interface Props {}

const AuthRequired: FC<Props> = () => {
  const location = useLocation();
  const { user, session, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if ((!user || !session) && !isLoading) {
    return <Navigate to={`/login?redirectTo=${location.pathname}`} />;
  }

  return <Outlet />;
};

export default AuthRequired;
