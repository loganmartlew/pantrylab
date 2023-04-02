'use client';

import {
  Button,
  Center,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useAuth } from '~/features/auth/useAuth';

export default function Page() {
  const { isAuth, user } = useAuth();

  console.log('[Page] isAuth, user', isAuth, user);

  const theme = useMantineTheme();

  const loggedIn = (
    <>
      <Text color='white'>You are logged in as {user?.first_name}</Text>
      <Button component={Link} href='/app' variant='white'>
        Go To App
      </Button>
    </>
  );

  const notLoggedIn = (
    <>
      <Text color='white'>You are not logged in</Text>
      <Button
        component={Link}
        href='/auth/login'
        variant='outline'
        sx={{ borderColor: theme.white, color: theme.white }}
      >
        Log In
      </Button>
      <Button component={Link} href='/auth/signup' variant='white'>
        Sign Up
      </Button>
    </>
  );

  return (
    <Center
      sx={{
        padding: '1em',
        minHeight: '100vh',
        backgroundColor: theme.colors[theme.primaryColor][6],
      }}
    >
      <Stack>
        <Title order={1} color='white'>
          Grocer
        </Title>
        {isAuth ? loggedIn : notLoggedIn}
      </Stack>
    </Center>
  );
}
