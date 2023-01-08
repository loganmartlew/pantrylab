import { FC } from 'react';
import { Center, Stack, Title } from '@mantine/core';

const LoginPage: FC = () => {
  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Stack>
        <Title order={1}>Grocer</Title>
      </Stack>
    </Center>
  );
};

export default LoginPage;
