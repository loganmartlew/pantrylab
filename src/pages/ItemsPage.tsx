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
import { FC } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useHousehold } from '~/features/household/useHousehold';
import NewItemForm from '~/features/items/NewItemForm';
import { useItem } from '~/features/items/useItem';

const ItemsPage: FC = () => {
  const [isItemModalOpen, itemModalHandlers] = useDisclosure(false);

  const { currentHousehold } = useHousehold();
  const { filteredItems, addItem } = useItem();

  const addNewItem = (name: string) => {
    addItem(name);
    itemModalHandlers.close();
  };

  return (
    <Box p='md'>
      <Title order={1}>Grocery Items</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
      <Stack>
        <Stack>
          <TextInput placeholder='Search items' rightSection={<MdSearch />} />
        </Stack>
        <ScrollArea>
          <Stack>
            {filteredItems.length < 1 && (
              <Text>No items in this household...</Text>
            )}
            {filteredItems.length >= 1 &&
              filteredItems.map(item => <p>{item.name}</p>)}
          </Stack>
        </ScrollArea>
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
        <NewItemForm onSubmit={addNewItem} />
      </Modal>
    </Box>
  );
};

export default ItemsPage;
