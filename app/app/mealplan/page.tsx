'use client';

import { ActionIcon, Button, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import {
  MdAdd,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import MealPlanDay from '~/features/mealplan/MealPlanDay';
import { dateToTextString, endOfWeek, startOfWeek } from '~/lib/dates/date';

interface Props {}

const MealPlanPage: FC<Props> = () => {
  const [weekDate, setWeekDate] = useState<Date>(new Date());

  const weekStartDate = startOfWeek(weekDate);
  const weekEndDate = endOfWeek(weekDate);

  const prevWeek = () => {
    setWeekDate(prev => {
      return dayjs(prev).subtract(1, 'week').toDate();
    });
  };

  const nextWeek = () => {
    setWeekDate(prev => {
      return dayjs(prev).add(1, 'week').toDate();
    });
  };

  const weekDates = [
    dayjs(weekStartDate).toDate(),
    dayjs(weekStartDate).add(1, 'day').toDate(),
    dayjs(weekStartDate).add(2, 'day').toDate(),
    dayjs(weekStartDate).add(3, 'day').toDate(),
    dayjs(weekStartDate).add(4, 'day').toDate(),
    dayjs(weekStartDate).add(5, 'day').toDate(),
    dayjs(weekStartDate).add(6, 'day').toDate(),
  ];

  return (
    <PageWrapper title='Meal Plan'>
      <Stack>
        <Group>
          <ActionIcon size='lg' onClick={prevWeek}>
            <MdOutlineKeyboardArrowLeft fontSize='1.8rem' />
          </ActionIcon>
          <Text align='center' sx={{ flexGrow: 1 }}>
            {dateToTextString(weekStartDate)} - {dateToTextString(weekEndDate)}
          </Text>
          <ActionIcon size='lg' onClick={nextWeek}>
            <MdOutlineKeyboardArrowRight fontSize='1.8rem' />
          </ActionIcon>
        </Group>
        <Stack spacing='lg'>
          {weekDates.map(date => (
            <MealPlanDay date={date} key={date.toISOString()} />
          ))}
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default MealPlanPage;
