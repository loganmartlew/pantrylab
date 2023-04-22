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
        <Stack spacing='xl'>
          <Stack spacing='xs'>
            <Title order={3}>Monday</Title>
            <Button
              size='xs'
              variant='light'
              leftIcon={<MdAdd size='1rem' />}
              sx={{ width: 'max-content' }}
            >
              Add Meal
            </Button>
          </Stack>
          <Stack spacing='xs'>
            <Title order={3}>Tuesday</Title>
            <Button
              size='xs'
              variant='light'
              leftIcon={<MdAdd size='1rem' />}
              sx={{ width: 'max-content' }}
            >
              Add Meal
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default MealPlanPage;
