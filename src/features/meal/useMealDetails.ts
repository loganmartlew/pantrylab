import { useEffect, useState } from 'react';
import { Meal } from '~/types';
import { getMeal } from './mealApi';

export const useMealDetails = (mealId: string) => {
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    getMeal(mealId).then(meal => {
      setMeal(meal);
    });
  }, []);

  return { meal };
};
