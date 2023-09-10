import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import { z } from 'zod';
import { itemCreateSchema, itemSchema, itemUpdateSchema } from './schemas';

export const itemsContract = c.router({
  createItem: {
    method: 'POST',
    path: '/households/:householdId/items',
    responses: {
      201: itemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: itemCreateSchema,
    summary: 'Create a new item',
  },
  findHouseholdItems: {
    method: 'GET',
    path: '/households/:householdId/items',
    query: z.object({ search: z.string().optional() }),
    responses: {
      200: z.array(itemSchema),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find all items in a household',
  },
  findHouseholdItem: {
    method: 'GET',
    path: '/households/:householdId/items/:itemId',
    responses: {
      200: itemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find an item in a household',
  },
  updateHouseholdItem: {
    method: 'PATCH',
    path: '/households/:householdId/items/:itemId',
    responses: {
      200: itemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: itemUpdateSchema,
    summary: 'Update an item in a household',
  },
  deleteHouseholdItem: {
    method: 'DELETE',
    path: '/households/:householdId/items/:itemId',
    responses: {
      200: itemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Delete an item in a household',
  },
});
