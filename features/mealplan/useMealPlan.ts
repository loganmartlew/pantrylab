import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useMemo } from 'react';
import { endOfWeek, startOfWeek } from '~/lib/dates/date';
import { useSupabase } from '~/lib/supabase';
import { useHousehold } from '~/features/household/useHousehold';
import { Meal, PlannedMeal } from '~/types';
import {
  addMealToHouseholdMealPlan,
  getHouseholdMealPlan,
  removeMealFromHouseholdMealPlan,
} from './mealPlanApi';

export const useMealPlan = () => {
  const { supabase } = useSupabase();

  const { currentHousehold } = useHousehold();

  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);
  const [weekDate, setWeekDate] = useState<Date>(new Date());

  const weekStartDate = useMemo(() => startOfWeek(weekDate), [weekDate]);
  const weekEndDate = useMemo(() => endOfWeek(weekDate), [weekDate]);

  const sortedPlannedMeals = [...plannedMeals].sort((a, b) => {
    if (a.meal.name < b.meal.name) {
      return -1;
    }

    if (a.meal.name > b.meal.name) {
      return 1;
    }

    return 0;
  });

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

  useEffect(() => {
    console.log('useEffect');

    if (!currentHousehold) {
      setPlannedMeals([]);
      return;
    }

    getHouseholdMealPlan(
      supabase,
      currentHousehold.id,
      weekStartDate,
      weekEndDate
    ).then(plannedMeals => {
      setPlannedMeals(plannedMeals);
    });
  }, [currentHousehold, weekStartDate, weekEndDate, supabase]);

  const addPlannedMeal = async (meal: Meal, date: Date) => {
    if (!currentHousehold) return;

    const oldPlannedMeals = [...plannedMeals];
    setPlannedMeals(plannedMeals => [
      ...plannedMeals,
      {
        id: uuidv4(),
        created_at: new Date(),
        date,
        household_id: currentHousehold.id,
        meal,
        meal_id: meal.id,
      },
    ]);

    const error = await addMealToHouseholdMealPlan(
      supabase,
      meal.id,
      currentHousehold.id,
      date
    );

    if (error) {
      setPlannedMeals(oldPlannedMeals);
    }

    getHouseholdMealPlan(
      supabase,
      currentHousehold.id,
      weekStartDate,
      weekEndDate
    ).then(plannedMeals => {
      setPlannedMeals(plannedMeals);
    });
  };

  const removePlannedMeal = async (plannedMealId: string) => {
    if (!currentHousehold) return;

    const oldPlannedMeals = [...plannedMeals];
    setPlannedMeals(plannedMeals =>
      plannedMeals.filter(plannedMeal => plannedMeal.id !== plannedMealId)
    );

    const error = await removeMealFromHouseholdMealPlan(
      supabase,
      plannedMealId
    );

    if (error) {
      setPlannedMeals(oldPlannedMeals);
    }

    getHouseholdMealPlan(
      supabase,
      currentHousehold.id,
      weekStartDate,
      weekEndDate
    ).then(plannedMeals => {
      setPlannedMeals(plannedMeals);
    });
  };

  return {
    weekDates,
    weekStartDate,
    weekEndDate,
    prevWeek,
    nextWeek,
    plannedMeals: sortedPlannedMeals,
    addPlannedMeal,
    removePlannedMeal,
  };
};
