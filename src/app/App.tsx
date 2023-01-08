import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import Providers from './Providers';
import router from './router';

const App: FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
