import { Stack } from '@mantine/core';
import { FC } from 'react';
import { useMeal } from './useMeal';
import MealCard from './MealCard';

interface Props {
  onSelectMeal: (mealId: string) => void;
}

const MealSelector: FC<Props> = ({ onSelectMeal }) => {
  const { sortedMeals } = useMeal();

  return (
    <Stack>
      {sortedMeals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          onClick={() => onSelectMeal(meal.id)}
        />
      ))}
    </Stack>
  );
};

export default MealSelector;
