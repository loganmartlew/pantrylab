import dayjs from 'dayjs';
import { supabase } from '~/lib/supabaseClient';
import { Item, Meal } from '~/types';

export const getHouseholdMeals = async (householdId: string) => {
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

  const meals = data.map(meal => ({
    id: meal.id,
    created_at: dayjs(meal.created_at).toDate(),
    name: meal.name,
    household_id: meal.household_id,
    description: meal.description,
  }));

  return meals as Meal[];
};

export const getMeal = async (mealId: string) => {
  if (!mealId) {
    return null;
  }

  const { data, error } = await supabase
    .from('meals')
    .select('*, items(*)')
    .eq('id', mealId)
    .limit(1)
    .single();

  console.log(data);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const meal = {
    id: data.id,
    created_at: dayjs(data.created_at).toDate(),
    name: data.name,
    household_id: data.household_id,
    description: data.description,
  };

  return meal as Meal;
};

export const createMeal = async (
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
    items.map(item => ({
      meal_id: data?.id,
      item_id: item.id,
    }))
  );

  if (itemsError) {
    console.error(itemsError);
  }

  return item;
};
