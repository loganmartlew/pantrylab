import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { MdAdd, MdAddShoppingCart, MdToday } from 'react-icons/md';
import { PlannedMeal } from '~/types';
import MealCard from '../meal/MealCard';
import ConfirmationModal from '~/components/ConfirmationModal';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  date: Date;
  plannedMeals: PlannedMeal[];
  addMealClick: (date: Date) => void;
  removeMeal: (plannedMeal: PlannedMeal) => void;
  addRangeToList: (startDate: Date, endDate: Date) => void;
}

const MealPlanDay: FC<Props> = ({
  date,
  addMealClick,
  plannedMeals,
  removeMeal,
  addRangeToList,
}) => {
  const [deletingMeal, setDeletingMeal] = useState<PlannedMeal | null>(null);
  const [confirmDeleteModalOpen, confirmDeleteModalHandlers] =
    useDisclosure(false);
  const theme = useMantineTheme();

  const isToday = dayjs(date).isSame(dayjs(), 'date');
  const daysPlannedMeals = plannedMeals.filter(meal => {
    return dayjs(meal.date).isSame(date, 'date');
  });

  const allMealsAdded =
    daysPlannedMeals.reduce((bool, curr) => {
      return !curr.added_list_item_ids ? false : bool;
    }, true) && daysPlannedMeals.length > 0;

  const onDeleteClick = async (plannedMeal: PlannedMeal) => {
    if (!plannedMeal.added_list_item_ids) {
      await removeMeal(plannedMeal);
      return;
    }

    setDeletingMeal(plannedMeal);
    confirmDeleteModalHandlers.open();
  };

  const confirmDelete = async () => {
    if (!deletingMeal) return;
    await removeMeal(deletingMeal);
    confirmDeleteModalHandlers.close();
  };

  return (
    <Stack spacing='xs'>
      <Group spacing='xs'>
        {isToday && (
          <Tooltip label='Today'>
            <Box mt='0.4rem'>
              <MdToday
                fontSize='1rem'
                color={theme.colors[theme.primaryColor][6]}
              />
            </Box>
          </Tooltip>
        )}
        <Title order={3} sx={{ flexGrow: 1 }}>
          {dayjs(date).format('dddd')}
        </Title>
      </Group>
      {daysPlannedMeals.map(plannedMeal => (
        <MealCard
          key={plannedMeal.id}
          meal={plannedMeal.meal}
          onDelete={() => onDeleteClick(plannedMeal)}
          deleteable
          added={!!plannedMeal.added_list_item_ids}
        />
      ))}
      <Group>
        <Button
          size='xs'
          variant='light'
          leftIcon={<MdAdd size='1rem' />}
          onClick={() => addMealClick(date)}
          sx={{ width: 'max-content' }}
        >
          Add Meal
        </Button>
        <Tooltip
          label={allMealsAdded ? 'All meals added' : 'Add all to  list'}
          position='right'
        >
          <ActionIcon
            variant='filled'
            color={theme.primaryColor}
            onClick={() => addRangeToList(date, date)}
            disabled={allMealsAdded}
          >
            <MdAddShoppingCart />
          </ActionIcon>
        </Tooltip>
      </Group>
      <ConfirmationModal
        isOpen={confirmDeleteModalOpen}
        onClose={confirmDeleteModalHandlers.close}
        onConfirm={confirmDelete}
        title='Delete Planned Meal'
        message='This meal has been added to your shopping list. Deleting it will remove the items from your list. Are you sure you want to delete it?'
      />
    </Stack>
  );
};

export default MealPlanDay;
