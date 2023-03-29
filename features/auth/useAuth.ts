import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Credentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const user = data?.user || null;

  const isAuth = status === 'authenticated';
  const isLoading = status === 'loading';

  const loginWithEmail = ({ email, password }: Credentials) =>
    signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

  const logout = async () => {
    const data = await signOut({ callbackUrl: '/', redirect: false });
    router.push(data.url || '/');
  };

  return {
    user,
    isAuth,
    isLoading,
    loginWithEmail,
    logout,
  };
};
