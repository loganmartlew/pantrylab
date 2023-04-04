import { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '~/types';
import { useHousehold } from '~/features/household/useHousehold';
import { createItem, deleteItem, getHouseholdItems } from './itemApi';
import { useSupabase } from '~/lib/supabase';

const sortItems = (items: Item[]) => {
  return [...items].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const useItem = () => {
  const { supabase } = useSupabase();

  const [items, setItems] = useState<Item[]>([]);
  const sortedItems = useMemo(() => sortItems(items), [items]);

  const [itemSearchTerm, setItemSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!itemSearchTerm) {
      return sortedItems;
    }

    return sortedItems.filter(item =>
      item.name.toLowerCase().includes(itemSearchTerm.toLowerCase())
    );
  }, [sortedItems, itemSearchTerm]);

  const { currentHousehold } = useHousehold();

  useEffect(() => {
    if (!currentHousehold) {
      setItems([]);
      return;
    }

    getHouseholdItems(supabase, currentHousehold.id).then(items => {
      setItems(items);
    });
  }, [currentHousehold, supabase]);

  const addItem = async (name: string) => {
    if (!currentHousehold) return;

    const newItem: Item = {
      id: uuidv4(),
      created_at: new Date(),
      name,
      household_id: currentHousehold?.id || '',
    };

    const oldItems = [...items];
    setItems(items => [...items, newItem]);

    const item = await createItem(supabase, name, currentHousehold.id || '');

    if (!item) {
      setItems(oldItems);
    }

    getHouseholdItems(supabase, currentHousehold.id).then(items => {
      setItems(items);
    });
  };

  const removeItem = async (itemId: string) => {
    if (!currentHousehold) return;

    const oldItems = [...items];
    setItems(items => items.filter(item => item.id !== itemId));

    const error = await deleteItem(supabase, itemId);

    if (error) {
      setItems(oldItems);
    }

    getHouseholdItems(supabase, currentHousehold.id).then(items => {
      setItems(items);
    });
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemSearchTerm(e.target.value);
  };

  return {
    items,
    sortedItems,
    filteredItems,
    itemSearchTerm,
    onSearchChange,
    addItem,
    removeItem,
  };
};
