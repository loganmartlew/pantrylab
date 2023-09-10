import {
  authErrors,
  c,
  defaultResponses,
  notFoundErrors,
} from '@pantrylab/contract';
import { plannedMealCreateSchema, plannedMealSchema } from './schemas';
import { z } from 'zod';

export const plannedMealsContract = c.router({
  createPlannedMeal: {
    method: 'POST',
    path: '/households/:householdId/plannedMeals',
    responses: {
      201: plannedMealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: plannedMealCreateSchema,
    summary: 'Create a new plannedMeal',
  },
  findHouseholdPlannedMeals: {
    method: 'GET',
    path: '/households/:householdId/plannedMeals',
    responses: {
      200: z.array(plannedMealSchema),
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    summary: 'Find all plannedMeals in a household',
  },
  deleteHouseholdPlannedMeal: {
    method: 'DELETE',
    path: '/households/:householdId/plannedMeals/:plannedMealId',
    responses: {
      200: plannedMealSchema,
      ...defaultResponses,
      ...authErrors,
      ...notFoundErrors,
    },
    body: z.object({}),
    summary: 'Delete a plannedMeal in a household',
  },
});
