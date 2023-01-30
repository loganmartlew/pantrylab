import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHousehold } from '~/features/household/useHousehold';
import { supabase } from '~/lib/supabaseClient';
import { Item, ListItem } from '~/types';
import { searchItems } from '~/features/item/itemApi';
import getHistoricItems from './getHistoricItems';
import {
  addItemToHouseholdList,
  deleteItem,
  getHouseholdList,
  openHouseholdListChannel,
  updateItem,
} from './listApi';

export const useList = () => {
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

    getHouseholdList(currentHousehold.id).then(items => {
      setList(items);
    });

    const householdListChannel = openHouseholdListChannel(
      currentHousehold.id,
      () => {
        getHouseholdList(currentHousehold.id).then(items => {
          setList(items);
        });
      }
    );

    return () => {
      supabase.removeChannel(householdListChannel);
    };
  }, [currentHousehold]);

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

    const error = await addItemToHouseholdList(item.id, currentHousehold.id);

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(currentHousehold.id).then(items => {
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

    const error = await updateItem(itemId, newItem);

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(currentHousehold.id).then(items => {
      setList(items);
    });
  };

  const removeListItem = async (itemId: string) => {
    if (!currentHousehold) return;

    const oldItems = [...list];
    setList(items => items.filter(item => item.id !== itemId));

    const error = await deleteItem(itemId);

    if (error) {
      setList(oldItems);
    }

    getHouseholdList(currentHousehold.id).then(items => {
      setList(items);
    });
  };

  const searchItemsToAdd = async (searchTerm: string) => {
    if (!currentHousehold) return [];

    const items = await searchItems(searchTerm, currentHousehold.id);

    return items;
  };

  return {
    list,
    currentItems: sortedCurrentItems,
    historicItems,
    addItemToList,
    updateListItem,
    removeListItem,
    searchItemsToAdd,
  };
};
