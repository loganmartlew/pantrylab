import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupabase } from '~/lib/supabase';
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
  const { supabase } = useSupabase();
  const router = useRouter();
  const params = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('[useAuth] user', user);
  }, [user]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Error fetching session', error);
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      if (!data || !data.session) {
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      const userId = data.session?.user.id;
      const isVerified = data.session?.user.email_confirmed_at !== null;

      setIsVerified(isVerified);

      supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.log('Error fetching user', error);
            return;
          }

          if (data) {
            setUser(data);
            setIsLoading(false);
          }
        });
    });

    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      const userId = session?.user.id;
      const isVerified = session?.user.email_confirmed_at !== null;

      setIsVerified(isVerified);

      supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.log('Error fetching user', error);
            return;
          }

          if (data) {
            setUser(data);
            setIsLoading(false);
          }
        });
    });
  }, [supabase]);

  const isAuth = !!user;

  const loginWithEmail = async ({ email, password }: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in', error);
      return;
    }

    router.push(params?.get('redirectedFrom') ?? '/');
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out', error);
      return;
    }

    router.push('/');
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
