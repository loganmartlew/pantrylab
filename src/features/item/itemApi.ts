import dayjs from 'dayjs';
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

  const items = data.map(item => ({
    id: item.id,
    created_at: dayjs(item.created_at).toDate(),
    name: item.name,
    household_id: item.household_id,
  }));

  return items as Item[];
};

export const searchItems = async (searchTerm: string, householdId: string) => {
  if (!searchTerm || !householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('household_id', householdId)
    .ilike('name', `%${searchTerm}%`);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const items = data.map((item: any) => ({
    id: item.id,
    created_at: dayjs(item.created_at).toDate(),
    name: item.name,
    household_id: item.household_id,
  }));

  return items as Item[];
};

export const createItem = async (name: string, householdId: string) => {
  if (!name || !householdId) {
    return null;
  }

  const { error, data } = await supabase
    .from('items')
    .insert({ name, household_id: householdId })
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

  return item;
};

export const deleteItem = async (itemId: string) => {
  if (!itemId) {
    return new Error('No item id provided');
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
    return listsError;
  }
  if (mealsError) {
    console.error(mealsError);
    return mealsError;
  }
  if (itemsError) {
    console.error(itemsError);
    return itemsError;
  }

  return null;
};
