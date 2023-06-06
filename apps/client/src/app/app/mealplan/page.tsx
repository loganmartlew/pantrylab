'use client';

import { ActionIcon, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import MealSelector from '~/features/meal/MealSelector';
import MealPlanDay from '~/features/mealplan/MealPlanDay';
import { useMealPlan } from '~/features/mealplan/useMealPlan';
import { dateToTextString } from '~/lib/dates/date';
import { Meal, PlannedMeal } from '~/types';

const MealPlanPage: FC = () => {
  const [isModalOpen, modalHandlers] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    nextWeek,
    prevWeek,
    weekDates,
    weekEndDate,
    weekStartDate,
    addPlannedMeal,
    plannedMeals,
    removePlannedMeal,
    addPlannedRangeToList,
  } = useMealPlan();

  const addMealClick = (date: Date) => {
    setSelectedDate(date);
    modalHandlers.open();
  };

  const addMeal = async (meal: Meal) => {
    if (!selectedDate) return;

    await addPlannedMeal(meal, selectedDate);

    modalHandlers.close();
  };

  const removeMeal = async (plannedMeal: PlannedMeal) => {
    await removePlannedMeal(plannedMeal.id);
  };

  const addRangeToList = async (startDate: Date, endDate: Date) => {
    await addPlannedRangeToList(startDate, endDate);
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
          {weekDates.map((date) => (
            <MealPlanDay
              date={date}
              addMealClick={addMealClick}
              plannedMeals={plannedMeals}
              removeMeal={removeMeal}
              addRangeToList={addRangeToList}
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
