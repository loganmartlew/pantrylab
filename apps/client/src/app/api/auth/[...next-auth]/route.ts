import { httpClient } from '@pantrylab/api';
import { loginSchema, Credentials } from '@pantrylab/auth/interface';
import { User } from '@pantrylab/users/interface';
import jwtDecode from 'jwt-decode';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: unknown) {
        const cred = loginSchema.parse(credentials);

        const res = await httpClient.post<Credentials>('/auth/login', {
          email: cred.email,
          password: cred.password,
        });

        const user = jwtDecode<User>(res.data.accessToken);

        if (!user) {
          return null;
        }

        return { ...user, accessToken: res.data.accessToken };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: authUser, account }) {
      console.log('jwt callback', { token, authUser, account });

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
});

export { handler as GET, handler as POST };
