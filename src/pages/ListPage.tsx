import { Box, Divider, Space, Stack, Text, Title } from '@mantine/core';
import { FC } from 'react';
import PageWrapper from '~/components/PageWrapper';
import { useHousehold } from '~/features/household/useHousehold';
import HistoricListItemCard from '~/features/list/HistoricListItemCard';
import ListItemCard from '~/features/list/ListItemCard';
import { useList } from '~/features/list/useList';
import { dateToTextString } from '~/lib/dates/date';

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
    <PageWrapper title='Shopping List' subtitle={currentHousehold?.name}>
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
      <Space h='xl' />
      <Stack>
        <Title order={2}>Completed Items ({historicItems.length})</Title>
        {historicItems.length < 1 && <Text>No items in this list...</Text>}
        {historicItems.length >= 1 &&
          historicItems.map(dateSection => (
            <>
              <Divider
                label={dateToTextString(dateSection.date)}
                labelPosition='center'
              />
              {dateSection.items.map(item => (
                <HistoricListItemCard item={item.item} details={item.details} />
              ))}
            </>
          ))}
      </Stack>
    </PageWrapper>
  );
};

export default ListPage;
