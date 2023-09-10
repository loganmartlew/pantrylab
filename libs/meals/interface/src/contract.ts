import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import { z } from 'zod';
import { mealCreateSchema, mealSchema, mealUpdateSchema } from './schemas';

export const mealsContract = c.router({
  createMeal: {
    method: 'POST',
    path: '/households/:householdId/meals',
    responses: {
      201: mealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: mealCreateSchema,
    summary: 'Create a new meal',
  },
  findHouseholdMeals: {
    method: 'GET',
    path: '/households/:householdId/meals',
    query: z.object({ search: z.string().optional() }),
    responses: {
      200: z.array(mealSchema),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find all meals in a household',
  },
  findHouseholdMeal: {
    method: 'GET',
    path: '/households/:householdId/meals/:mealId',
    responses: {
      200: mealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find a meal in a household',
  },
  updateHouseholdMeal: {
    method: 'PATCH',
    path: '/households/:householdId/meals/:mealId',
    responses: {
      200: mealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: mealUpdateSchema,
    summary: 'Update a meal in a household',
  },
  deleteHouseholdMeal: {
    method: 'DELETE',
    path: '/households/:householdId/meals/:mealId',
    responses: {
      200: mealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Delete a meal in a household',
  },
});
