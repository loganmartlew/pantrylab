import { ListItem } from '~/types';

export default (items: ListItem[]) => {
  const sortedItems = [...items].sort((a, b) => {
    if (a.completed_at! < b.completed_at!) {
      return 1;
    }

    if (a.completed_at! > b.completed_at!) {
      return -1;
    }

    return 0;
  });

  const historicItemsObj = sortedItems.reduce((historic, item) => {
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

  return sortedHistoricItems;
};
