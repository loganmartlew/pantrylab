import { supabase } from '~/lib/supabaseClient';
import { Item, ListItem } from '~/types';

export const getHouseholdList = async (householdId: string) => {
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

  const listItems = data.map(item => ({
    id: item.id,
    created_at: item.created_at,
    item: item.items,
    item_id: item.item_id,
    household_id: item.household_id,
    completed_at: item.completed_at,
    complete: item.complete,
  }));

  return listItems as ListItem[];
};

export const openHouseholdListChannel = (
  householdId: string,
  callback: (payload: unknown) => void
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
      callback
    )
    .subscribe();
};
