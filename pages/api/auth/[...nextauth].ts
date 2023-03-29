import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '~/lib/supabaseClient';
import { User } from '~/src/types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials) return null;

        const { email, password } = credentials;

        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (loginError) {
          console.error(loginError);
          return null;
        }

        if (!loginData) {
          console.error('No login data returned');
          return null;
        }

        if (!loginData.user) {
          console.error('No user data returned');
          return null;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', loginData.user.id)
          .limit(1)
          .single();

        if (userError) {
          console.error(userError);
          return null;
        }

        if (!userData) {
          console.error('No user data returned');
          return null;
        }

        const user: User = userData;

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  callbacks: {
    session: async ({ token, session }) => {
      if (token.user) {
        session.user = token.user;
      }

      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return Promise.resolve(token);
    },
  },
};

export default nextAuth(authOptions);
