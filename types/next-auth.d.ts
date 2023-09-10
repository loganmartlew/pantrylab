import 'next-auth';
import { UserEntity } from '@pantrylab/users';

declare module 'next-auth' {
  export interface Session {
    user: UserEntity;
    accessToken: string;
    expires: never;
  }

  export interface User extends UserEntity {
    accessToken: string;
  }
}
