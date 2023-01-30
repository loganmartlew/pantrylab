import {
  Button,
  Divider,
  Modal,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { MdAdd } from 'react-icons/md';
import PageWrapper from '~/components/PageWrapper';
import { useHousehold } from '~/features/household/useHousehold';
import AddToListForm from '~/features/list/AddToListForm';
import ListItemCard from '~/features/list/ListItemCard';
import ListItemDisplayCard from '~/features/list/ListItemDisplayCard';
import { useList } from '~/features/list/useList';
import { dateToTextString } from '~/lib/dates/date';
import { Item } from '~/types';

const ListPage: FC = () => {
  const [isAddItemModalOpen, addItemModalHandlers] = useDisclosure(false);

  const {
    currentItems,
    historicItems,
    updateListItem,
    removeListItem,
    searchItemsToAdd,
    addItemToList,
  } = useList();
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

  const addItem = (item: Item) => {
    addItemToList(item);
    addItemModalHandlers.close();
  };

  const addNewItem = (name: string) => {};

  return (
    <PageWrapper title='Shopping List' subtitle={currentHousehold?.name}>
      <Stack>
        <Button
          variant='light'
          leftIcon={<MdAdd />}
          onClick={addItemModalHandlers.open}
        >
          Add Item
        </Button>
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
                <ListItemDisplayCard item={item.item} details={item.details} />
              ))}
            </>
          ))}
      </Stack>
      <Modal
        title='Add Item'
        opened={isAddItemModalOpen}
        onClose={addItemModalHandlers.close}
      >
        <AddToListForm
          searchFn={searchItemsToAdd}
          addItemToList={addItem}
          addNewItemToList={addNewItem}
        />
      </Modal>
    </PageWrapper>
  );
};

export default ListPage;
