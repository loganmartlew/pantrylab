import { apiBasicClient } from '@pantrylab/api';
import { loginSchema } from '@pantrylab/auth/interface';
import { User } from '@pantrylab/users/interface';
import jwtDecode from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(cred: unknown) {
        const credentials = loginSchema.parse(cred);

        const { status, body: data } = await apiBasicClient.Auth.login({
          body: credentials,
        });

        if (status !== 200) {
          return null;
        }

        const user = jwtDecode<User>(data.accessToken);

        if (!user) {
          return null;
        }

        cookies().set('refreshToken', data.refreshToken, {
          httpOnly: true,
        });

        return { ...user, accessToken: data.accessToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authUser, account }) {
      if (!authUser && !account) {
        return token;
      }

      const accessToken = authUser.accessToken;
      const { accessToken: _, ...user } = authUser;

      return { user, accessToken };
    },
    async session({ session, token, user }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
});

export { handler as GET, handler as POST };
