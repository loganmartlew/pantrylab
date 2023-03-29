import dayjs from 'dayjs';

export const dateFormat = 'DD/MM/YYYY';
export const dateToString = (date: Date) => dayjs(date).format(dateFormat);
export const stringToDate = (date: string) => dayjs(date, dateFormat).toDate();

export const dateTextFormat = 'D MMMM YYYY';
export const dateToTextString = (date: Date) =>
  dayjs(date).format(dateTextFormat);
export const textStringToDate = (date: string) =>
  dayjs(date, dateTextFormat).toDate();
