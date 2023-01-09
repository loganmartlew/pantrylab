import { FC } from 'react';
import { Button, Center, Stack, Text } from '@mantine/core';
import Logo from '~/components/Logo';
import { Link } from 'react-router-dom';

const ConfirmEmailPage: FC = () => {
  return (
    <Center sx={{ height: '100vh' }}>
      <Stack>
        <Logo size='xl' />
        <Text size='lg'>
          Please confirm your email address. Check your inbox for a confirmation
          email.
        </Text>
        <Button component={Link} to='/' size='md'>
          I have confirmed my email
        </Button>
      </Stack>
    </Center>
  );
};

export default ConfirmEmailPage;
