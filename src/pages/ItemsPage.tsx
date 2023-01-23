import {
  Box,
  Button,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { FC } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useHousehold } from '~/features/household/useHousehold';
import { useItem } from '~/features/items/useItem';

const ItemsPage: FC = () => {
  const { currentHousehold } = useHousehold();
  const { filteredItems } = useItem();

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
          sx={{ width: '100%' }}
        >
          New Item
        </Button>
      </Box>
    </Box>
  );
};

export default ItemsPage;
