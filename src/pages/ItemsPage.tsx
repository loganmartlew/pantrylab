import {
  Box,
  Button,
  Modal,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, useState } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useHousehold } from '~/features/household/useHousehold';
import ItemCard from '~/features/item/ItemCard';
import NewItemForm from '~/features/item/NewItemForm';
import { useItem } from '~/features/item/useItem';
import { useList } from '~/features/list/useList';
import { Item } from '~/types';

const ItemsPage: FC = () => {
  const [isItemModalOpen, itemModalHandlers] = useDisclosure(false);

  const { currentHousehold } = useHousehold();
  const {
    items,
    filteredItems,
    addItem,
    itemSearchTerm,
    onSearchChange,
    removeItem,
  } = useItem();
  const { currentItems, addItemToList, removeListItem } = useList();

  const currentItemIds = currentItems.map(item => item.item.id);

  const addNewItem = (name: string) => {
    addItem(name);
    itemModalHandlers.close();
  };

  const deleteItem = (id: string) => {
    removeItem(id);
  };

  const addToList = (item: Item) => {
    addItemToList(item);
  };

  const removeFromList = async (itemId: string) => {
    const id = currentItems.find(item => item.item.id === itemId)?.id;
    removeListItem(id ?? '');
  };

  return (
    <Box p='md'>
      <Title order={1}>Grocery Items</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
      <TextInput
        mb='md'
        placeholder='Search items'
        rightSection={<MdSearch />}
        value={itemSearchTerm}
        onChange={onSearchChange}
      />
      <Stack pb='sm'>
        {filteredItems.length < 1 && <Text>No items in this household...</Text>}
        {filteredItems.length >= 1 &&
          filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              addedToList={currentItemIds.indexOf(item.id) >= 0}
              deleteItem={() => deleteItem(item.id)}
              addToList={() => addToList(item)}
              removeFromList={() => removeFromList(item.id)}
            />
          ))}
      </Stack>
      <Box p='md' sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Button
          variant='light'
          leftIcon={<MdAdd size='1.1rem' />}
          onClick={itemModalHandlers.open}
          sx={{ width: '100%' }}
        >
          New Item
        </Button>
      </Box>
      <Modal
        opened={isItemModalOpen}
        onClose={itemModalHandlers.close}
        title='New Item'
      >
        <NewItemForm onSubmit={addNewItem} items={items} />
      </Modal>
    </Box>
  );
};

export default ItemsPage;
