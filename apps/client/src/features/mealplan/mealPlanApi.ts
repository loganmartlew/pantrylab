import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { dateToIsoString, isoStringToDate } from '../../lib/dates/date';
import { PlannedMeal } from '../../types';

export const getHouseholdMealPlan = async (
  supabase: SupabaseClient,
  householdId: string,
  startDate: Date,
  endDate: Date,
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

  const plannedMeals = data.map((plannedMeal) => ({
    id: plannedMeal.id,
    date: isoStringToDate(plannedMeal.date),
    created_at: dayjs(plannedMeal.created_at).toDate(),
    meal: {
      id: plannedMeal.meals.id,
      name: plannedMeal.meals.name,
      created_at: dayjs(plannedMeal.meals.created_at).toDate(),
      household_id: plannedMeal.meals.household_id,
      description: plannedMeal.meals.description,
    },
    meal_id: plannedMeal.meal_id,
    household_id: plannedMeal.household_id,
    added_list_item_ids: plannedMeal.added_list_items,
  }));

  return plannedMeals as PlannedMeal[];
};

export const addMealToHouseholdMealPlan = async (
  supabase: SupabaseClient,
  mealId: string,
  householdId: string,
  date: Date,
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
  plannedMealId: string,
  householdId: string,
) => {
  if (!plannedMealId) {
    return new Error('No planned meal id provided');
  }

  await supabase.rpc('remove_planned_meal_from_list', {
    _planned_meal_id: plannedMealId,
    _household_id: householdId,
  });

  const { error } = await supabase
    .from('planned_meals')
    .delete()
    .eq('id', plannedMealId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const addRangeToHouseholdList = async (
  supabase: SupabaseClient,
  householdId: string,
  startDate: Date,
  endDate: Date,
) => {
  if (!householdId) {
    return new Error('No household id provided');
  }

  if (!startDate || !endDate) {
    return new Error('No date range provided');
  }

  const { error } = await supabase.rpc('add_planned_range_to_list', {
    _household_id: householdId,
    _start_date: dateToIsoString(startDate),
    _end_date: dateToIsoString(endDate),
  });

  if (error) {
    console.error(error);
  }

  return error;
};
