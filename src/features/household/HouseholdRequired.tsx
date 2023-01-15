import { Box, Title } from '@mantine/core';
import { FC } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import NewHouseholdForm from './NewHouseholdForm';
import { useHousehold } from './useHousehold';

interface Props {}

const HouseholdRequired: FC<Props> = () => {
  const { currentHousehold } = useHousehold();

  if (!currentHousehold) {
    return (
      <Box p='md'>
        <Title order={2} mb='sm'>
          No Household Selected
        </Title>
        <NewHouseholdForm />
      </Box>
    );
  }

  return <Outlet />;
};

export default HouseholdRequired;
