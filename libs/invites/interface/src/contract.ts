import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import { z } from 'zod';
import { inviteCreateSchema, inviteSchema } from './schemas';

export const invitesContract = c.router({
  //Invitee methods
  findUserInvites: {
    method: 'GET',
    path: '/invites',
    responses: {
      200: z.array(inviteSchema),
      ...defaultResponses,
      ...authErrors,
    },
    summary: 'Find a users pending invites',
  },
  acceptInvite: {
    method: 'PATCH',
    path: '/invites/:inviteId/accept',
    responses: {
      200: inviteSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Accept an invite',
  },
  rejectInvite: {
    method: 'DELETE',
    path: '/invites/:inviteId',
    responses: {
      200: inviteSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Reject an invite',
  },

  //Inviter methods
  createInvite: {
    method: 'POST',
    path: '/households/:householdId/invites',
    responses: {
      201: inviteSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: inviteCreateSchema,
    summary: 'Create a new invite',
  },
  findHouseholdInvites: {
    method: 'GET',
    path: '/households/:householdId/invites',
    responses: {
      200: z.array(inviteSchema),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find a households pending invites',
  },
  cancelInvite: {
    method: 'DELETE',
    path: '/households/:householdId/invites/:inviteId',
    responses: {
      200: inviteSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Cancel an invite',
  },
});
