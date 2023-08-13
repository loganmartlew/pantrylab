'use client';

import { Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import PageWrapper from '../../../../components/PageWrapper';
import MealItemCard from '../../../../features/meal/MealItemCard';
import { useMealDetails } from '../../../../features/meal/useMealDetails';

interface Props {
  params: { mealId: string };
}

const MealDetailsPage: FC<Props> = ({ params }) => {
  const { meal } = useMealDetails(params.mealId || '');

  if (!meal) return <Text>Meal does not exist</Text>;

  return (
    <PageWrapper title={meal.name}>
      <Stack>
        {meal.description.length > 0 && (
          <Stack spacing='sm'>
            <Title order={3}>Description</Title>
            <Text>{meal.description}</Text>
          </Stack>
        )}
        <Stack spacing='sm'>
          <Title order={3}>Meal Items</Title>
          {meal.items.length < 1 && <Text>No Items...</Text>}
          {meal.items.length >= 0 &&
            meal.items.map((item) => (
              <MealItemCard item={item} key={item.id} />
            ))}
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default MealDetailsPage;
