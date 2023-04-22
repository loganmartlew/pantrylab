import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { dateToIsoString, isoStringToDate } from '~/lib/dates/date';
import { PlannedMeal } from '~/types';

export const getHouseholdMealPlan = async (
  supabase: SupabaseClient,
  householdId: string,
  startDate: Date,
  endDate: Date
) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('planned_meals')
    .select('*, meals!inner(*)')
    .eq('household_id', householdId)
    .gte('date', dateToIsoString(startDate))
    .lte('date', dateToIsoString(endDate));

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const plannedMeals = data.map(item => ({
    id: item.id,
    date: isoStringToDate(item.date),
    created_at: dayjs(item.created_at).toDate(),
    meal: {
      id: item.meals.id,
      name: item.meals.name,
      created_at: dayjs(item.meals.created_at).toDate(),
      household_id: item.meals.household_id,
      description: item.meals.description,
    },
    meal_id: item.meal_id,
    household_id: item.household_id,
  }));

  return plannedMeals as PlannedMeal[];
};

export const addMealToHouseholdMealPlan = async (
  supabase: SupabaseClient,
  mealId: string,
  householdId: string,
  date: Date
) => {
  if (!mealId || !householdId) {
    return new Error('No meal id or household id provided');
  }

  const { error } = await supabase.from('planned_meals').insert({
    meal_id: mealId,
    household_id: householdId,
    date: dateToIsoString(date),
  });

  if (error) {
    console.error(error);
  }

  return error;
};

export const removeMealFromHouseholdMealPlan = async (
  supabase: SupabaseClient,
  plannedMealId: string
) => {
  if (!plannedMealId) {
    return new Error('No planned meal id provided');
  }

  const { error } = await supabase
    .from('planned_meals')
    .delete()
    .eq('id', plannedMealId);

  if (error) {
    console.error(error);
  }

  return error;
};
