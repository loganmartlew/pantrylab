import { authErrors, c, defaultResponses } from '@pantrylab/contract';
import { z } from 'zod';
import { credentialsSchema, loginSchema, signupSchema } from './schemas';

export const authContract = c.router({
  login: {
    method: 'POST',
    path: '/auth/login',
    responses: {
      200: credentialsSchema,
      ...defaultResponses,
      ...authErrors,
    },
    body: loginSchema,
    summary: 'Login',
  },
  signup: {
    method: 'POST',
    path: '/auth/signup',
    responses: {
      201: credentialsSchema,
      ...defaultResponses,
    },
    body: signupSchema,
    summary: 'Signup',
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    responses: {
      200: z.null(),
      ...authErrors,
    },
    body: z.object({}),
    summary: 'Logout',
  },
  refresh: {
    method: 'GET',
    path: '/auth/refresh',
    query: z.object({
      refreshToken: z.string().optional(),
    }),
    responses: {
      200: credentialsSchema,
      ...authErrors,
    },
    summary: 'Refresh tokens',
  },
});
