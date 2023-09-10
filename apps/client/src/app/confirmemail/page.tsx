'use client';

import { Button, Center, Stack, Text } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import Logo from '../../components/Logo';
import { useTempCredentials } from '../../features/auth/tempCredentialsAtom';
import { useAuth } from '../../features/auth/useAuth';
import { getUrlWithRedirected } from '../../util/getUrlWithRedirected';

const ConfirmEmailPage: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const { loginWithEmail } = useAuth();
  const { credentials, setCredentials } = useTempCredentials();

  const confirmedClick = async () => {
    if (credentials) {
      await loginWithEmail(credentials);
      setCredentials(null);
      return;
    } else {
      router.push(getUrlWithRedirected('/auth/login', false, params, pathname));
    }
  };

  return (
    <Center sx={{ padding: '1em', minHeight: '100vh' }}>
      <Stack>
        <Logo size='xl' />
        <Text size='lg'>
          Please confirm your email address. Check your inbox for a confirmation
          email.
        </Text>
        <Button onClick={confirmedClick} size='md'>
          I have confirmed my email
        </Button>
      </Stack>
    </Center>
  );
};

export default ConfirmEmailPage;
