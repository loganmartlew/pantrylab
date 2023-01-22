import { useEffect, useCallback } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { useStore } from '~/features/store';
import { Session } from '@supabase/supabase-js';
import { getUser } from './authApi';

export const useAuth = () => {
  const { user, session, isLoading, setIsLoading, setSession, setUser } =
    useStore(s => s.auth);

  const isAuthenticated = user && session;

  useEffect(() => {
    // Get session data if already active
    // setIsLoading(true);
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Listen for changes to auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
    });

    // Cleanup useffect hook
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      getUser(session.user.id).then(user => {
        setUser(user);
        setIsLoading(false);
      });
    }
  }, [session]);

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
      }
    },
    []
  );

  const signup = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signUp({
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
      }

      await loginWithEmail(email, password);

      return data.session;
    },
    []
  );

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);

    if (error) {
      console.error(error);
    }
  }, []);

  return {
    user,
    session,
    setSession,
    loginWithEmail,
    signup,
    logout,
    isLoading,
    setIsLoading,
    isAuthenticated,
  };
};
