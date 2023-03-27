import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Meal, Item } from '~/types';
import { useHousehold } from '~/features/household/useHousehold';
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
  const [meals, setMeals] = useState<Meal[]>([]);
  const sortedMeals = useMemo(() => sortMeals(meals), [meals]);

  const { currentHousehold } = useHousehold();

  useEffect(() => {
    console.log('useMeal useEffect');
    if (!currentHousehold) {
      setMeals([]);
      return;
    }

    getHouseholdMeals(currentHousehold.id).then(meals => {
      setMeals(meals);
    });
  }, [currentHousehold]);

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
    setMeals(meals => [...meals, newMeal]);

    const meal = await createMeal(
      name,
      description,
      items,
      currentHousehold.id || ''
    );

    if (!meal) {
      setMeals(oldMeals);
    }

    getHouseholdMeals(currentHousehold.id).then(meals => {
      setMeals(meals);
    });
  };

  return {
    meals,
    sortedMeals,
    addMeal,
  };
};
