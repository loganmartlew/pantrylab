import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { Item, Meal } from '../../types';

export const getHouseholdMeals = async (
  supabase: SupabaseClient,
  householdId: string
) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const meals = data.map((meal) => ({
    id: meal.id,
    created_at: dayjs(meal.created_at).toDate(),
    name: meal.name,
    household_id: meal.household_id,
    description: meal.description,
  }));

  return meals as Meal[];
};

export const getMeal = async (supabase: SupabaseClient, mealId: string) => {
  if (!mealId) {
    return null;
  }

  const { data: mealData, error: mealError } = await supabase
    .from('meals')
    .select('*')
    .eq('id', mealId)
    .limit(1)
    .single();

  if (mealError) {
    console.error(mealError);
  }

  if (!mealData) {
    return null;
  }

  const { data: itemsData, error: itemsError } = await supabase
    .from('meal_items')
    .select('*, items!inner(*)')
    .eq('meal_id', mealId);

  if (itemsError) {
    console.error(itemsError);
  }

  const itemsDataArr = itemsData || [];

  const items = itemsDataArr.map((item) => ({
    id: item.items.id,
    created_at: dayjs(item.items.created_at).toDate(),
    name: item.items.name,
    household_id: item.items.household_id,
  }));

  const meal: Meal = {
    id: mealData.id,
    created_at: dayjs(mealData.created_at).toDate(),
    name: mealData.name,
    household_id: mealData.household_id,
    description: mealData.description,
    items,
  };

  return meal;
};

export const createMeal = async (
  supabase: SupabaseClient,
  name: string,
  description: string,
  items: Item[],
  householdId: string
) => {
  if (!name || !householdId) {
    return null;
  }

  const { error, data } = await supabase
    .from('meals')
    .insert({ name, description, household_id: householdId })
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error);
  }

  const item: Item = {
    id: data?.id,
    created_at: dayjs(data?.created_at).toDate(),
    name: data?.name,
    household_id: data?.household_id,
  };

  const { error: itemsError } = await supabase.from('meal_items').insert(
    items.map((item) => ({
      meal_id: data?.id,
      item_id: item.id,
    }))
  );

  if (itemsError) {
    console.error(itemsError);
  }

  return item;
};
