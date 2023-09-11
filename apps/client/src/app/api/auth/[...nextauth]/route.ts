import { apiClient } from '@pantrylab/api';
import { loginSchema } from '@pantrylab/auth/interface';
import { User } from '@pantrylab/users/interface';
import jwtDecode from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(cred: unknown) {
        const credentials = loginSchema.parse(cred);

        const res = await apiClient.Auth.login({body: credentials});

        if (res.status !== 200) {
          return null;
        }

        const user = jwtDecode<User>(res.body.accessToken);

        if (!user) {
          return null;
        }

        return { ...user, accessToken: res.body.accessToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authUser, account }) {
      console.log('jwt callback', { token, authUser, account });

      if (!authUser && !account) {
        return token;
      }

      const accessToken = authUser.accessToken;
      const { accessToken: _, ...user } = authUser;

      return { user, accessToken };
    },
    async session({ session, token, user }) {
      console.log('session callback', { session, token, user });

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
  }
});

export { handler as GET, handler as POST };
