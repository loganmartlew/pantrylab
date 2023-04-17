'use client';

import { FC, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import RootStyleRegistry from './style-provider';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relative from 'dayjs/plugin/relativeTime';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '~/lib/graphql/apolloClient';

interface Props {
  children: ReactNode;
}

dayjs.extend(relative);
dayjs.extend(customParseFormat);

const Providers: FC<Props> = ({ children }) => {
  return (
    <RootStyleRegistry>
      <ApolloProvider client={apolloClient}>
        <JotaiProvider>{children}</JotaiProvider>
      </ApolloProvider>
    </RootStyleRegistry>
  );
};
export default Providers;
