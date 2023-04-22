import {
  Box,
  Button,
  Group,
  Stack,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import dayjs from 'dayjs';
import { FC } from 'react';
import { MdAdd, MdToday } from 'react-icons/md';
import { PlannedMeal } from '~/types';
import MealCard from '../meal/MealCard';

interface Props {
  date: Date;
  plannedMeals: PlannedMeal[];
  addMealClick: (date: Date) => void;
  removeMeal: (plannedMeal: PlannedMeal) => void;
}

const MealPlanDay: FC<Props> = ({
  date,
  addMealClick,
  plannedMeals,
  removeMeal,
}) => {
  const theme = useMantineTheme();

  const isToday = dayjs(date).isSame(dayjs(), 'date');
  const daysPlannedMeals = plannedMeals.filter(meal => {
    return dayjs(meal.date).isSame(date, 'date');
  });

  return (
    <Stack spacing='xs'>
      <Group spacing='xs'>
        {isToday && (
          <Tooltip label='Today'>
            <Box mt='0.4rem'>
              <MdToday
                fontSize='1rem'
                color={theme.colors[theme.primaryColor][6]}
              />
            </Box>
          </Tooltip>
        )}
        <Title order={3}>{dayjs(date).format('dddd')}</Title>
      </Group>
      {daysPlannedMeals.map(plannedMeal => (
        <MealCard
          key={plannedMeal.id}
          meal={plannedMeal.meal}
          onDelete={() => removeMeal(plannedMeal)}
          deleteable
        />
      ))}
      <Button
        size='xs'
        variant='light'
        leftIcon={<MdAdd size='1rem' />}
        onClick={() => addMealClick(date)}
        sx={{ width: 'max-content' }}
      >
        Add Meal
      </Button>
    </Stack>
  );
};

export default MealPlanDay;
