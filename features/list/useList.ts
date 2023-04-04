import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHousehold } from '~/features/household/useHousehold';
import { Item, ListItem } from '~/types';
import { createItem, searchItems } from '~/features/item/itemApi';
import getHistoricItems from './getHistoricItems';
import {
  addItemToHouseholdList,
  deleteItem,
  getHouseholdList,
  openHouseholdListChannel,
  updateItem,
} from './listApi';
import { useSupabase } from '~/lib/supabase';

export const useList = () => {
  const { supabase } = useSupabase();

  const { currentHousehold } = useHousehold();

  const [list, setList] = useState<ListItem[]>([]);

  const currentItems = list.filter(item => !item.complete);

  const sortedCurrentItems = [...currentItems].sort((a, b) => {
    if (a.created_at! < b.created_at!) {
      return -1;
    }

    if (a.created_at! > b.created_at!) {
      return 1;
    }

    return 0;
  });

  const completedItems = list.filter(
    item => item.complete && item.completed_at
  );

  const historicItems = getHistoricItems(completedItems);

  useEffect(() => {
    if (!currentHousehold) {
      setList([]);
      return;
    }

    getHouseholdList(supabase, currentHousehold.id).then(items => {
      setList(items);
    });

    const householdListChannel = openHouseholdListChannel(
      supabase,
      currentHousehold.id,
      () => {
        getHouseholdList(supabase, currentHousehold.id).then(items => {
          setList(items);
        });
      }
    );

    return () => {
      supabase.removeChannel(householdListChannel);
    };
  }, [currentHousehold, supabase]);

  const addItemToList = async (item: Item) => {
    if (!currentHousehold) return;

    const oldItems = [...list];
    setList(items => [
      ...items,
      {
        id: uuidv4(),
        created_at: new Date(),
        item: item,
        item_id: item.id,
        household_id: currentHousehold.id,
        completed_at: null,
        complete: false,
        details: '',
      },
    ]);

    const error = await addItemToHouseholdList(
      supabase,
      item.id,
      currentHousehold.id
    );

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(supabase, currentHousehold.id).then(items => {
      setList(items);
    });
  };

  const updateListItem = async (itemId: string, newItem: Partial<ListItem>) => {
    if (!currentHousehold) return;

    const oldItems = [...list];
    setList(items =>
      items.map(item => {
        const consolidatedItem = {
          ...item,
          ...newItem,
        };

        if (item.id === itemId) {
          return {
            ...consolidatedItem,
            completed_at: consolidatedItem.complete ? new Date() : null,
          };
        }

        return item;
      })
    );

    const error = await updateItem(supabase, itemId, newItem);

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(supabase, currentHousehold.id).then(items => {
      setList(items);
    });
  };

  const removeListItem = async (itemId: string) => {
    if (!currentHousehold) return;

    const oldItems = [...list];
    setList(items => items.filter(item => item.id !== itemId));

    const error = await deleteItem(supabase, itemId);

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(supabase, currentHousehold.id).then(items => {
      setList(items);
    });
  };

  const searchItemsToAdd = async (searchTerm: string) => {
    if (!currentHousehold) return [];

    const items = await searchItems(supabase, searchTerm, currentHousehold.id);

    return items;
  };

  const addNewItemToList = async (name: string) => {
    if (!currentHousehold) return;

    const newListItem: ListItem = {
      id: uuidv4(),
      created_at: new Date(),
      complete: false,
      completed_at: null,
      details: '',
      household_id: currentHousehold.id,
      item_id: '',
      item: {
        id: uuidv4(),
        name,
        household_id: currentHousehold.id,
        created_at: new Date(),
      },
    };

    const oldItems = [...list];
    setList(items => [...items, newListItem]);

    const item = await createItem(supabase, name, currentHousehold.id);
    if (!item) {
      setList(oldItems);
      return;
    }

    const error = await addItemToHouseholdList(
      supabase,
      item.id,
      currentHousehold.id
    );
    if (error) {
      setList(oldItems);
      return;
    }

    getHouseholdList(supabase, currentHousehold.id).then(items => {
      setList(items);
    });
  };

  return {
    list,
    currentItems: sortedCurrentItems,
    historicItems,
    addItemToList,
    updateListItem,
    removeListItem,
    searchItemsToAdd,
    addNewItemToList,
  };
};
