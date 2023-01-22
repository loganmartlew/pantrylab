import { MantineProvider } from '@mantine/core';
import { FC, ReactNode } from 'react';
import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import theme from './theme';

dayjs.extend(relative);

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
