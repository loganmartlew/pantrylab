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
import { usePathname, useSearchParams } from 'next/navigation';
import Logo from '~/components/Logo';
import { useAuth } from '~/features/auth/useAuth';
import { getUrlWithRedirected } from '~/util/getUrlWithRedirected';

export default function Page() {
  const params = useSearchParams();
  const pathname = usePathname();

  const { isAuth, user } = useAuth();

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
        href={getUrlWithRedirected('/auth/login', false, params, pathname)}
        variant='outline'
        sx={{ borderColor: theme.white, color: theme.white }}
      >
        Log In
      </Button>
      <Button
        component={Link}
        href={getUrlWithRedirected('/auth/signup', false, params, pathname)}
        variant='white'
      >
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
        <Logo size='xl' variant='textLogo' color='white' />
        {isAuth ? loggedIn : notLoggedIn}
      </Stack>
    </Center>
  );
}
