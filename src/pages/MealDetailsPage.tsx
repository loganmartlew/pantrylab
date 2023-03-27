import { Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '~/components/PageWrapper';
import MealItemCard from '~/features/meal/MealItemCard';
import { useMealDetails } from '~/features/meal/useMealDetails';

const MealDetailsPage: FC = () => {
  const { id } = useParams();
  const { meal } = useMealDetails(id || '');

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
            meal.items.map(item => <MealItemCard item={item} key={item.id} />)}
        </Stack>
      </Stack>
    </PageWrapper>
  );
};

export default MealDetailsPage;
