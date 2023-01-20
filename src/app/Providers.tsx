import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import { AuthProvider } from '~/features/auth/authContext';
import { HouseholdProvider } from '~/features/household/householdContext';
import theme from './theme';

dayjs.extend(relative);

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
