import { Button, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { MdAdd } from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import { useHousehold } from '~/features/household/useHousehold';
import { useList } from '~/features/list/useList';
import MealForm, { MealFormValues } from '~/features/meal/MealForm';

const MealsPage: FC = () => {
  const [isMealModalOpen, mealModalHandlers] = useDisclosure(false);

  const { currentHousehold } = useHousehold();
  const { searchItemsToAdd } = useList();

  const handleSubmit = (values: MealFormValues) => {};

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
