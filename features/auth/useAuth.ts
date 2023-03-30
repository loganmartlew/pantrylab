import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from '~/src/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const user = (data?.user || null) as User | null;

  const isAuth = status === 'authenticated';
  const isLoading = status === 'loading';

  const loginWithEmail = async ({ email, password }: LoginCredentials) => {
    const data = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });
    if (!data) {
      console.error('Login failed unexpectedly');
      return;
    }

    if (data.error) {
      console.error(data.error);
      return;
    }

    if (data.ok) {
      router.push(data.url ?? '/');
    }
  };

  const logout = async () => {
    const data = await signOut({ callbackUrl: '/', redirect: false });
    router.push(data.url || '/');
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignupCredentials) => {};

  return {
    user,
    isAuth,
    isLoading,
    loginWithEmail,
    logout,
    signup,
  };
};
