import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AppLayout;
