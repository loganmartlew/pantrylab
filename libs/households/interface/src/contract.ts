import { authErrors, c, notFoundErrors } from '@pantrylab/contract';
import {
  householdCreateSchema,
  householdSchema,
  householdUpdateSchema,
} from './schemas';
import { z } from 'zod';

export const householdsContract = c.router({
  createHousehold: {
    method: 'POST',
    path: '/households',
    responses: {
      201: householdSchema,
      ...authErrors,
    },
    body: householdCreateSchema,
    summary: 'Create a new household',
  },
  findHouseholdsByUser: {
    method: 'GET',
    path: '/households',
    responses: {
      200: z.array(householdSchema),
      ...authErrors,
    },
    summary: 'Find all households for a user',
  },
  findHouseholdById: {
    method: 'GET',
    path: '/households/:householdId',
    //pathParams: z.object({ householdId: z.string().uuid() }),
    responses: {
      200: householdSchema,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find a household by id',
  },
  updateHousehold: {
    method: 'PATCH',
    path: '/households/:householdId',
    responses: {
      200: householdSchema,
      ...authErrors,
      ...notFoundErrors,
    },
    body: householdUpdateSchema,
    summary: 'Update a household',
  },
  deleteHousehold: {
    method: 'DELETE',
    path: '/households/:householdId',
    responses: {
      200: householdSchema,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.null(),
    summary: 'Delete a household',
  },
  removeHouseholdUser: {
    method: 'DELETE',
    path: '/households/:householdId/user/:userId',
    responses: {
      200: z.null(),
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.null(),
    summary: 'Remove a user from a household',
  },
});
