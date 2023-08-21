import {
  authErrors,
  c,
  notFoundErrors,
  defaultResponses,
} from '@pantrylab/contract';
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
      ...defaultResponses,
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
      ...defaultResponses,
      ...authErrors,
    },
    summary: 'Find all households for a user',
  },
  findHouseholdById: {
    method: 'GET',
    path: '/households/:householdId',
    responses: {
      200: householdSchema,
      ...defaultResponses,
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
      ...defaultResponses,
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
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Delete a household',
  },
  removeHouseholdUser: {
    method: 'DELETE',
    path: '/households/:householdId/users/:userId',
    responses: {
      200: z.null(),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Remove a user from a household',
  },
});
