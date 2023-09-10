import { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHousehold } from '../../features/household/useHousehold';
import { useSupabase } from '../../lib/supabase';
import { Item, Meal } from '../../types';
import { createMeal, getHouseholdMeals } from './mealApi';

const sortMeals = (items: Meal[]) => {
  return [...items].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const useMeal = () => {
  const { supabase } = useSupabase();

  const [meals, setMeals] = useState<Meal[]>([]);
  const sortedMeals = useMemo(() => sortMeals(meals), [meals]);

  const { currentHousehold } = useHousehold();

  useEffect(() => {
    if (!currentHousehold) {
      setMeals([]);
      return;
    }

    getHouseholdMeals(supabase, currentHousehold.id).then((meals) => {
      setMeals(meals);
    });
  }, [currentHousehold, supabase]);

  const addMeal = async (name: string, description: string, items: Item[]) => {
    if (!currentHousehold) return;

    const newMeal: Meal = {
      id: uuidv4(),
      created_at: new Date(),
      name,
      description,
      items,
      household_id: currentHousehold?.id || '',
    };

    const oldMeals = [...meals];
    setMeals((meals) => [...meals, newMeal]);

    const meal = await createMeal(
      supabase,
      name,
      description,
      items,
      currentHousehold.id || '',
    );

    if (!meal) {
      setMeals(oldMeals);
    }

    getHouseholdMeals(supabase, currentHousehold.id).then((meals) => {
      setMeals(meals);
    });
  };

  return {
    meals,
    sortedMeals,
    addMeal,
  };
};
