import {
  Box,
  Button,
  ScrollArea,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { FC } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { useHousehold } from '~/features/household/useHousehold';

const ItemsPage: FC = () => {
  const { currentHousehold } = useHousehold();

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
        <ScrollArea></ScrollArea>
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
