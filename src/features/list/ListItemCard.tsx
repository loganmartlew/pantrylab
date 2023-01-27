import { Group, Paper, Title } from '@mantine/core';
import { FC } from 'react';
import { Item } from '~/types';

interface Props {
  item: Item;
}

const ListItemCard: FC<Props> = ({ item }) => {
  return (
    <Paper shadow='xs' p='sm'>
      <Group spacing='sm'>
        <Title order={4}>{item.name}</Title>
      </Group>
    </Paper>
  );
};

export default ListItemCard;
