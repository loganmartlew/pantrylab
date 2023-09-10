import { authErrors, c, defaultResponses } from '@pantrylab/contract';
import { credentialsSchema, loginSchema, signupSchema } from './schemas';
import { z } from 'zod';

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
    responses: {
      200: credentialsSchema,
      ...authErrors,
    },
    summary: 'Refresh tokens',
  },
});
