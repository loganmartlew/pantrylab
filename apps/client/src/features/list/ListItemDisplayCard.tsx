import { Paper, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { Item } from '../../types';

interface Props {
  item: Item;
  details: string;
  onClick?: () => void;
}

const ListItemDisplayCard: FC<Props> = ({ item, details, onClick }) => {
  return (
    <Paper shadow='xs' p='sm' onClick={onClick} sx={{ minWidth: '250px' }}>
      <Stack sx={{ flexGrow: 1, gap: 0 }}>
        <Title order={4}>{item.name}</Title>
        {details && (
          <Text size='sm' lineClamp={1}>
            {details}
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

export default ListItemDisplayCard;
