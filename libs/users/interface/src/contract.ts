import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import { userSchema, userUpdateSchema } from './schemas';

export const usersContract = c.router({
  getSelf: {
    method: 'GET',
    path: '/users/me',
    responses: {
      200: userSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Get the current user',
  },
  updateSelf: {
    method: 'PATCH',
    path: '/users/me',
    responses: {
      200: userSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: userUpdateSchema,
    summary: 'Update the current user',
  },
});
