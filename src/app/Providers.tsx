import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { AuthProvider } from '~/features/auth/authContext';
import { HouseholdProvider } from '~/features/household/householdContext';
import theme from './theme';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <AuthProvider>
        <HouseholdProvider>{children}</HouseholdProvider>
      </AuthProvider>
    </MantineProvider>
  );
};

export default Providers;
