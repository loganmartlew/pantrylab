import dayjs from 'dayjs';

export const startOfWeek = (date: Date) => {
  const day = dayjs(date).startOf('week');

  if (day.day() === 0) {
    return day.add(1, 'day').toDate();
  }

  return day.toDate();
};

export const endOfWeek = (date: Date) => {
  const day = dayjs(date).endOf('week');

  if (day.day() === 6) {
    return day.add(1, 'day').toDate();
  }

  return day.toDate();
};

export const dateFormat = 'DD/MM/YYYY';
export const dateToString = (date: Date) => dayjs(date).format(dateFormat);
export const stringToDate = (date: string) => dayjs(date, dateFormat).toDate();

export const dateTextFormat = 'D MMMM YYYY';
export const dateToTextString = (date: Date) =>
  dayjs(date).format(dateTextFormat);
export const textStringToDate = (date: string) =>
  dayjs(date, dateTextFormat).toDate();
