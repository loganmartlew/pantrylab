import {
  createContext,
  ReactNode,
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '~/lib/supabaseClient';
import LoadingScreen from '~/components/LoadingScreen';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthContext {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<Session | null>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<Session | null>;
}

export const authContext = createContext<Partial<AuthContext>>({});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = session !== null;

  useEffect(() => {
    // Get session data if already active
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };
    getSession();

    // Listen for changes to auth state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoading(true);
      setSession(session);

      const result = await supabase
        .from('users')
        .select()
        .eq('id', session?.user?.id);
      const user = result.data?.find(u => u.id === session?.user?.id);

      setUser(user);
      setIsLoading(false);
    });

    // Cleanup useffect hook
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        setIsLoading(false);
      }

      return data.session;
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
        setIsLoading(false);
      }

      return data.session;
    },
    []
  );

  const value: AuthContext = {
    user,
    session,
    isAuthenticated,
    isLoading,
    loginWithEmail,
    signup,
  };

  return (
    <authContext.Provider value={value}>
      {!isLoading ? children : <LoadingScreen />}
    </authContext.Provider>
  );
};
