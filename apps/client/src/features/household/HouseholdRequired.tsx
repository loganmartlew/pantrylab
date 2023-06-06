import { Box, Title } from '@mantine/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import NewHouseholdForm from './NewHouseholdForm';
import { useHousehold } from './useHousehold';

const HouseholdRequired: FC = () => {
  const { currentHousehold, isLoading } = useHousehold();

  if (isLoading) {
    return <LoadingScreen />;
  }

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
