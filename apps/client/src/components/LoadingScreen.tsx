import { Center, Loader } from '@mantine/core';
import { FC } from 'react';

const LoadingScreen: FC = () => {
  return (
    <Center sx={{ height: '100vh' }}>
      <Loader size='xl' />
    </Center>
  );
};

export default LoadingScreen;
