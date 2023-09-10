import { Stack } from '@mantine/core';
import { FC } from 'react';
import { Meal } from '../../types';
import MealCard from './MealCard';
import { useMeal } from './useMeal';

interface Props {
  onSelectMeal: (meal: Meal) => void;
}

const MealSelector: FC<Props> = ({ onSelectMeal }) => {
  const { sortedMeals } = useMeal();

  return (
    <Stack>
      {sortedMeals.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          onClick={() => onSelectMeal(meal)}
        />
      ))}
    </Stack>
  );
};

export default MealSelector;
