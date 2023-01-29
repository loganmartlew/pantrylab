import { Box, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import { useHousehold } from '~/features/household/useHousehold';
import ListItemCard from '~/features/list/ListItemCard';
import { useList } from '~/features/list/useList';

const ListPage: FC = () => {
  const { currentItems, historicItems, updateListItem, removeListItem } =
    useList();
  const { currentHousehold } = useHousehold();

  const completeItem = (itemId: string) => {
    updateListItem(itemId, { complete: true });
  };

  const removeItem = (itemId: string) => {
    removeListItem(itemId);
  };

  const editItemDetails = (itemId: string, details: string) => {
    updateListItem(itemId, { details });
  };

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
            <ListItemCard
              key={item.id}
              item={item.item}
              details={item.details}
              completeItem={() => completeItem(item.id)}
              removeItem={() => removeItem(item.id)}
              editItemDetails={details => editItemDetails(item.id, details)}
            />
          ))}
      </Stack>
      <Stack>
        <Title order={2}>Past Items ({historicItems.length})</Title>
        {historicItems.length < 1 && <Text>No items in this list...</Text>}
        {historicItems.length >= 1 &&
          historicItems.map(dateSection => (
            <>
              <Text>{dateSection.date}</Text>
              {dateSection.items.map(item => (
                <Text>{item.item.name}</Text>
              ))}
            </>
          ))}
      </Stack>
    </Box>
  );
};

export default ListPage;
