import {
  ActionIcon,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { FC, ReactNode } from 'react';
import { MdDelete, MdPlaylistAddCheck } from 'react-icons/md';
import Link from 'next/link';
import { Meal } from '~/types';

interface Props {
  meal: Meal;
  linkToMeal?: boolean;
  deleteable?: boolean;
  added?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const MealCard: FC<Props> = ({
  meal,
  onClick,
  onDelete,
  deleteable,
  linkToMeal,
  added,
}) => {
  const theme = useMantineTheme();

  return (
    <Wrapper linkToMeal={linkToMeal} meal={meal} onClick={onClick}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Group spacing='xs'>
          <Title order={4}>{meal.name}</Title>
          {added && (
            <MdPlaylistAddCheck color={theme.colors[theme.primaryColor][7]} />
          )}
        </Group>
        {deleteable && (
          <ActionIcon color='red' onClick={onDelete}>
            <MdDelete onClick={onDelete} />
          </ActionIcon>
        )}
      </Group>
    </Wrapper>
  );
};

const Wrapper: FC<{
  children: ReactNode;
  linkToMeal?: boolean;
  meal: Meal;
  onClick?: () => void;
}> = ({ children, linkToMeal, meal, onClick }) => {
  if (linkToMeal) {
    return (
      <Paper
        shadow='xs'
        p='sm'
        sx={{ minWidth: '250px' }}
        component={Link}
        href={`/app/meals/${meal.id}`}
      >
        {children}
      </Paper>
    );
  }

  return (
    <Paper shadow='xs' p='sm' sx={{ minWidth: '250px' }} onClick={onClick}>
      {children}
    </Paper>
  );
};

export default MealCard;
