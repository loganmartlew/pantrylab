import { ActionIcon, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import Link from 'next/link';
import { Meal } from '~/types';

interface Props {
  meal: Meal;
  deleteable?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const MealCard: FC<Props> = ({ meal, onClick, onDelete, deleteable }) => {
  return (
    <Paper
      shadow='xs'
      p='sm'
      onClick={onClick}
      sx={{ minWidth: '250px' }}
      component={Link}
      href={`/app/meals/${meal.id}`}
    >
      <Group sx={{ justifyContent: 'space-between' }}>
        <Title order={4}>{meal.name}</Title>
        {deleteable && (
          <ActionIcon color='red' onClick={onDelete}>
            <MdDelete onClick={onDelete} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
};

export default MealCard;
