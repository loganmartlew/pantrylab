import { httpClient } from '@pantrylab/api';
import { LoginDtoSchema, LoginEntity } from '@pantrylab/auth';
import { UserEntity } from '@pantrylab/users';
import jwtDecode from 'jwt-decode';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: unknown) {
        const cred = LoginDtoSchema.parse(credentials);

        const res = await httpClient.post<LoginEntity>('/auth/login', {
          email: cred.email,
          password: cred.password,
        });

        const user = jwtDecode<UserEntity>(res.data.accessToken);

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

      session.user = token.user as UserEntity;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
