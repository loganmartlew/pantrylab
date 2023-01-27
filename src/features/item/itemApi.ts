import { supabase } from '~/lib/supabaseClient';
import { Item } from '~/types';

export const getHouseholdItems = async (householdId: string) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  return data as Item[];
};

export const createItem = async (name: string, householdId: string) => {
  if (!name || !householdId) {
    return null;
  }

  const { error } = await supabase
    .from('items')
    .insert({ name, household_id: householdId });

  if (error) {
    console.error(error);
  }
};

export const deleteItem = async (itemId: string) => {
  if (!itemId) {
    return null;
  }

  const { error: listsError } = await supabase
    .from('list_items')
    .delete()
    .eq('item_id', itemId);
  const { error: mealsError } = await supabase
    .from('meal_items')
    .delete()
    .eq('item_id', itemId);
  const { error: itemsError } = await supabase
    .from('items')
    .delete()
    .eq('id', itemId);

  if (listsError) {
    console.error(listsError);
  }
  if (mealsError) {
    console.error(mealsError);
  }
  if (itemsError) {
    console.error(itemsError);
  }
};
