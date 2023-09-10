import { SupabaseClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { ListItem } from '../../types';

export const getHouseholdList = async (
  supabase: SupabaseClient,
  householdId: string,
) => {
  if (!householdId) {
    return [];
  }

  const { data, error } = await supabase
    .from('household_list_items')
    .select('*, items!inner(*)')
    .eq('household_id', householdId);

  if (error) {
    console.error(error);
  }

  if (!data) {
    return [];
  }

  const listItems = data.map((item) => ({
    id: item.id,
    created_at: dayjs(item.created_at).toDate(),
    item: {
      id: item.items.id,
      name: item.items.name,
      created_at: dayjs(item.items.created_at).toDate(),
      household_id: item.items.household_id,
    },
    item_id: item.item_id,
    household_id: item.household_id,
    completed_at: dayjs(item.completed_at).toDate(),
    complete: item.complete,
    details: item.details,
  }));

  return listItems as ListItem[];
};

export const addItemToHouseholdList = async (
  supabase: SupabaseClient,
  itemId: string,
  householdId: string,
) => {
  if (!itemId || !householdId) {
    return new Error('No item id or household id provided');
  }

  const { error } = await supabase
    .from('household_list_items')
    .insert({ item_id: itemId, household_id: householdId });

  if (error) {
    console.error(error);
  }

  return error;
};

export const updateItem = async (
  supabase: SupabaseClient,
  itemId: string,
  newItem: Partial<ListItem>,
) => {
  if (!itemId) {
    return new Error('No item id provided');
  }

  const { error } = await supabase

    .from('household_list_items')
    .update(newItem)
    .eq('id', itemId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const deleteItem = async (supabase: SupabaseClient, itemId: string) => {
  if (!itemId) {
    return new Error('No item id provided');
  }

  const { error } = await supabase
    .from('household_list_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error(error);
  }

  return error;
};

export const openHouseholdListChannel = (
  supabase: SupabaseClient,
  householdId: string,
  callback: (payload: unknown) => void,
) => {
  return supabase
    .channel('public:household_list_items')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'household_list_items',
        filter: `household_id=eq.${householdId}`,
      },
      callback,
    )
    .subscribe();
};
