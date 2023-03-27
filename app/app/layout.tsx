import { FC, ReactNode, use } from 'react';
import AuthRequired from './AuthRequired';

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello');
  }, 3000);
});

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <AuthRequired>
      <h1>AppLayout</h1>
      {children}
    </AuthRequired>
  );
};

export default AppLayout;
