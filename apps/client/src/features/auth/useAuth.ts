import { useHttp } from '@pantrylab/api';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginCredentials, SignupCredentials } from '../../types';

export const useAuth = () => {
  const { data: session } = useSession();
  const httpClient = useHttp();

  const isAuth = !!session;
  const isVerified = true;

  const user = session?.user;

  const loginWithEmail = async ({ email, password }: LoginCredentials) => {
    signIn('credentials', { email, password, callbackUrl: '/dashboard' });
  };

  const logout = async () => {
    await httpClient.post('/auth/logout');
    signOut();
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignupCredentials) => {
    // setCredentials({ email, password });
    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       firstName,
    //       lastName,
    //     },
    //   },
    // });
    // if (error) {
    //   console.error(error);
    //   return;
    // }
    // await loginWithEmail({ email, password });
  };

  return {
    user,
    isAuth,
    isVerified,
    loginWithEmail,
    logout,
    signup,
  };
};
