import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import theme from './theme';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      {children}
    </MantineProvider>
  );
};

export default Providers;
