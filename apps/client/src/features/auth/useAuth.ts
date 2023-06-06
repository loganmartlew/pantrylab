import { Session, User as AuthUser } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSupabase } from '~/lib/supabase';
import { LoginCredentials, SignupCredentials, User } from '~/types';
import { getUrlWithRedirected } from '~/util/getUrlWithRedirected';
import { useTempCredentials } from './tempCredentialsAtom';

export const useAuth = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const params = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setCredentials } = useTempCredentials();

  const sessionCallback = useCallback(
    async (session: Session | null, user: AuthUser | null) => {
      if (!session || !user) {
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      const userId = user.id;
      const isVerified = !!user.email_confirmed_at;
      const wasVerified = !!user.confirmation_sent_at;

      setIsVerified(isVerified && wasVerified);

      const userData = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userData.error) {
        console.error('Error fetching user', userData.error);
        return;
      }

      if (userData.data) {
        setUser(userData.data as User);
        setIsLoading(false);
      }
    },
    [supabase]
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error fetching session', error);
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      if (!session) {
        setUser(null);
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      supabase.auth.getUser().then(({ data, error }) => {
        if (error) {
          console.error('Error fetching user', error);
          setUser(null);
          setIsVerified(false);
          setIsLoading(false);
          return;
        }

        sessionCallback(session, data.user);
      });
    });

    supabase.auth.onAuthStateChange((event, session) => {
      supabase.auth.getUser().then(({ data, error }) => {
        if (error) {
          console.error('Error fetching user', error);
          setUser(null);
          setIsVerified(false);
          setIsLoading(false);
          return;
        }

        console.log('SESSION CB: state changed');
        sessionCallback(session, data.user);
      });
    });
  }, [supabase, sessionCallback]);

  const isAuth = !!user;

  const loginWithEmail = async ({ email, password }: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in', error);

      if (
        error.name === 'AuthApiError' &&
        error.message === 'Email not confirmed'
      ) {
        router.push(
          getUrlWithRedirected('/confirmemail', true, params, '/app')
        );
        return;
      }

      return;
    }

    setCredentials(null);
    router.push(params?.get('redirectedFrom') ?? '/app');
  };

  const logout = () => {
    supabase.auth.signOut().catch(error => {
      console.error(error);
    });

    router.push('/');
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: SignupCredentials) => {
    setCredentials({ email, password });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    await loginWithEmail({ email, password });
  };

  return {
    user,
    isAuth,
    isLoading,
    isVerified,
    loginWithEmail,
    logout,
    signup,
  };
};
