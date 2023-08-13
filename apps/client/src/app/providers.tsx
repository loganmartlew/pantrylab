'use client';

import { FC, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import RootStyleRegistry from './style-provider';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relative from 'dayjs/plugin/relativeTime';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

dayjs.extend(relative);
dayjs.extend(customParseFormat);

const Providers: FC<Props> = ({ children }) => {
  return (
    <RootStyleRegistry>
      <JotaiProvider>
        <SessionProvider>{children}</SessionProvider>
      </JotaiProvider>
    </RootStyleRegistry>
  );
};
export default Providers;
