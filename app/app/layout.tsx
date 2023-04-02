import { FC, ReactNode } from 'react';
import AuthRequired from '~/features/auth/AuthRequired';
import AppLayoutWrapper from '~/features/layout/AppLayout';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <AuthRequired>
      <AppLayoutWrapper>{children}</AppLayoutWrapper>
    </AuthRequired>
  );
};

export default AppLayout;
