'use client';

import { FC, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import RootStyleRegistry from './style-provider';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relative from 'dayjs/plugin/relativeTime';

interface Props {
  children: ReactNode;
}

dayjs.extend(relative);
dayjs.extend(customParseFormat);

const Providers: FC<Props> = ({ children }) => {
  return (
    <RootStyleRegistry>
      <JotaiProvider>{children}</JotaiProvider>
    </RootStyleRegistry>
  );
};
export default Providers;
