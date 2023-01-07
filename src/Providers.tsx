import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default Providers;
