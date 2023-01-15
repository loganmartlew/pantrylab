import { Box, Title } from '@mantine/core';
import { FC } from 'react';
import { useHousehold } from '~/features/household/useHousehold';

interface Props {}

const UsersPage: FC<Props> = () => {
  const { currentHousehold } = useHousehold();
  return (
    <Box p='md'>
      <Title>Users</Title>
      <Title>{currentHousehold?.name}</Title>
    </Box>
  );
};

export default UsersPage;
