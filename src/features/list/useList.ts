import { useState, useEffect } from 'react';
import { useHousehold } from '~/features/household/useHousehold';
import { supabase } from '~/lib/supabaseClient';
import { Item, ListItem } from '~/types';
import { getHouseholdList, openHouseholdListChannel } from './listApi';

export const useList = () => {
  const { currentHousehold } = useHousehold();

  const [list, setList] = useState<ListItem[]>([]);

  const currentItems = list.filter(item => !item.complete);
  const completedItems = list.filter(
    item => item.complete && item.completed_at
  );

  const sortedCompletedItems = [...completedItems].sort((a, b) => {
    if (a.completed_at! < b.completed_at!) {
      return 1;
    }

    if (a.completed_at! > b.completed_at!) {
      return -1;
    }

    return 0;
  });

  const historicItemsObj = sortedCompletedItems.reduce((historic, item) => {
    const date = item.completed_at!.toLocaleDateString();

    return {
      ...historic,
      [date]: [...(historic[date] || []), item],
    };
  }, {} as { [key: string]: ListItem[] });

  const historicItems = Object.keys(historicItemsObj).map(key => ({
    date: key,
    items: historicItemsObj[key],
  }));

  const sortedHistoricItems = [...historicItems].sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date > b.date) {
      return -1;
    }

    return 0;
  });

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

  return {
    list,
    currentItems,
    completedItems,
    historicItems: sortedHistoricItems,
  };
};
