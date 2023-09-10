import { useEffect, useState } from 'react';
import { useSupabase } from '../../lib/supabase';
import { Meal } from '../../types';
import { getMeal } from './mealApi';

export const useMealDetails = (mealId: string) => {
  const { supabase } = useSupabase();

  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    getMeal(supabase, mealId).then((meal) => {
      setMeal(meal);
    });
  }, [supabase, mealId]);

  return { meal };
};
