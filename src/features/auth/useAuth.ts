import { useEffect, useCallback } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { useStore } from '~/features/store';

export const useAuth = () => {
  const { user, session, setSession } = useStore(s => s.auth);

  console.log('useAuth', { user, session, setSession });

  useEffect(() => {
    // Get session data if already active
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

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
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
    },
    []
  );

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

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
  };
};
