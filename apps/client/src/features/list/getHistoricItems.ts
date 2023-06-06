/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { dateToString, stringToDate } from '~/lib/dates/date';
import { ListItem } from '~/types';

const getHistoricItems = (items: ListItem[]) => {
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
    const date = dateToString(item.completed_at!);

    return {
      ...historic,
      [date]: [...(historic[date] || []), item],
    };
  }, {} as { [key: string]: ListItem[] });

  const historicItems = Object.keys(historicItemsObj).map((key) => ({
    date: stringToDate(key),
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

export default getHistoricItems;
