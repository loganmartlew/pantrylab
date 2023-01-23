import { Box, Title } from '@mantine/core';
import { FC } from 'react';
import { useHousehold } from '~/features/household/useHousehold';

const ItemsPage: FC = () => {
  const { currentHousehold } = useHousehold();

  return (
    <Box p='md'>
      <Title order={1}>Grocery Items</Title>
      <Title order={3} fw='normal' mb='md'>
        {currentHousehold?.name}
      </Title>
    </Box>
  );
};

export default ItemsPage;
