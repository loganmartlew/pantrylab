import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import {
  listItemCreateSchema,
  listItemSchema,
  listItemUpdateSchema,
} from './schemas';
import { z } from 'zod';

export const listItemsContract = c.router({
  createListItem: {
    method: 'POST',
    path: '/households/:householdId/listItems',
    responses: {
      201: listItemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: listItemCreateSchema,
    summary: 'Create a new listItem',
  },
  findHouseholdListItems: {
    method: 'GET',
    path: '/households/:householdId/listItems',
    query: z.object({ search: z.string().optional() }),
    responses: {
      200: z.array(listItemSchema),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find all listItems in a household',
  },
  findHouseholdListItem: {
    method: 'GET',
    path: '/households/:householdId/listItems/:listItemId',
    responses: {
      200: listItemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find a listItem in a household',
  },
  updateHouseholdListItem: {
    method: 'PATCH',
    path: '/households/:householdId/listItems/:listItemId',
    responses: {
      200: listItemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: listItemUpdateSchema,
    summary: 'Update a listItem in a household',
  },
  completeHouseholdListItem: {
    method: 'PATCH',
    path: '/households/:householdId/listItems/:listItemId/complete',
    responses: {
      200: listItemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Complete a listItem in a household',
  },
  deleteHouseholdListItem: {
    method: 'DELETE',
    path: '/households/:householdId/listItems/:listItemId',
    responses: {
      200: listItemSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Delete a listItem in a household',
  },
});
