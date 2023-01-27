import { Box, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useHousehold } from '~/features/household/useHousehold';
import ListItemCard from '~/features/list/ListItemCard';
import { useList } from '~/features/list/useList';

const ListPage: FC = () => {
  const { currentItems, historicItems } = useList();
  const { currentHousehold } = useHousehold();

  return (
    <Box p='md'>
      <Title order={1}>Shopping List</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
      <Stack>
        <Title order={2}>Current Items ({currentItems.length})</Title>
        {currentItems.length < 1 && (
          <Text>No items in this shopping list...</Text>
        )}
        {currentItems.length >= 1 &&
          currentItems.map(item => (
            <ListItemCard key={item.id} item={item.item} details='Light blue' />
          ))}
      </Stack>
    </Box>
  );
};

export default ListPage;
