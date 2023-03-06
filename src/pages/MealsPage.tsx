import { Button, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { MdAdd } from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import { useHousehold } from '~/features/household/useHousehold';
import { useList } from '~/features/list/useList';
import MealForm, { MealFormValues } from '~/features/meal/MealForm';
import { useMeal } from '~/features/meal/useMeal';

const MealsPage: FC = () => {
  const [isMealModalOpen, mealModalHandlers] = useDisclosure(false);

  const { currentHousehold } = useHousehold();
  const { searchItemsToAdd } = useList();

  const { sortedMeals, addMeal } = useMeal();

  const handleSubmit = (values: MealFormValues) => {
    addMeal(values.name, values.description, values.items);
    mealModalHandlers.close();
  };

  return (
    <PageWrapper title='Saved Meals' subtitle={currentHousehold?.name}>
      <Stack>
        <Button
          variant='light'
          leftIcon={<MdAdd size='1.1rem' />}
          onClick={mealModalHandlers.open}
        >
          New Item
        </Button>
        {sortedMeals.length < 1 && <Text>No meals in this household...</Text>}
        {sortedMeals.length >= 1 &&
          sortedMeals.map(meal => <Text key={meal.id}>{meal.name}</Text>)}
      </Stack>
      <Modal
        title='New Meal'
        opened={isMealModalOpen}
        onClose={mealModalHandlers.close}
      >
        <MealForm searchFn={searchItemsToAdd} onSubmit={handleSubmit} />
      </Modal>
    </PageWrapper>
  );
};

export default MealsPage;
