import { useContext } from 'react';
import { authContext, AuthContext } from './authContext';

export const useAuth = () => {
  return useContext(authContext) as AuthContext;
};
