import { ActionIcon, Group, Paper, Title } from '@mantine/core';
import { FC } from 'react';
import { MdDelete } from 'react-icons/md';
import { Item } from '~/types';

interface Props {
  item: Item;
  deleteable?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const MealItemCard: FC<Props> = ({ item, onClick, onDelete, deleteable }) => {
  return (
    <Paper shadow='xs' p='sm' onClick={onClick} sx={{ minWidth: '250px' }}>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Title order={4}>{item.name}</Title>
        {deleteable && (
          <ActionIcon color='red' onClick={onDelete}>
            <MdDelete onClick={onDelete} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
};

export default MealItemCard;
