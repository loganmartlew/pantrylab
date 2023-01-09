import { createContext, ReactNode, FC, useEffect, useState } from 'react';
import { Session, User as AuthUser } from '@supabase/supabase-js';
import { supabase } from '~/lib/supabaseClient';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthContext {
  user: User | null;
  session: Session | null;
}

export const authContext = createContext<Partial<AuthContext>>({});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      switch (event) {
        case 'SIGNED_IN':
          setSession(session);
          supabase
            .from('users')
            .select()
            .eq('id', session?.user?.id)
            .then(({ data }) => {
              if (data) {
                setUser(data[0]);
              }
            });
          return;
        case 'SIGNED_OUT':
          setSession(null);
          setUser(null);
          return;
        default:
          setSession(session);
          return;
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  });

  const value: AuthContext = {
    user,
    session,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
