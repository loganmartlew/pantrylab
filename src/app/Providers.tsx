import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { AuthProvider } from '~/features/auth/authContext';
import theme from './theme';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
};

export default Providers;
