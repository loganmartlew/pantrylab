import { FC, ReactNode } from 'react';
import AppLayoutWrapper from '~/features/layout/AppLayout';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>;
};

export default AppLayout;
