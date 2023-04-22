'use client';

import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import {
  MdAdd,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import MealSelector from '~/features/meal/MealSelector';
import MealPlanDay from '~/features/mealplan/MealPlanDay';
import { dateToTextString, endOfWeek, startOfWeek } from '~/lib/dates/date';

interface Props {}

const MealPlanPage: FC<Props> = () => {
  const [isModalOpen, modalHandlers] = useDisclosure(false);
  const [weekDate, setWeekDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const weekDates = [0, 1, 2, 3, 4, 5, 6].map(day =>
    dayjs(weekStartDate).add(day, 'day').toDate()
  );

  const addMealClick = (date: Date) => {
    setSelectedDate(date);
    modalHandlers.open();
  };

  const addMeal = (mealId: string) => {
    console.log(mealId);
    console.log(selectedDate);
    modalHandlers.close();
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
        <Stack spacing='lg'>
          {weekDates.map(date => (
            <MealPlanDay
              date={date}
              addMealClick={addMealClick}
              key={date.toISOString()}
            />
          ))}
        </Stack>
      </Stack>
      <Modal
        title='Add Meal'
        opened={isModalOpen}
        onClose={modalHandlers.close}
      >
        <MealSelector onSelectMeal={addMeal} />
      </Modal>
    </PageWrapper>
  );
};

export default MealPlanPage;
