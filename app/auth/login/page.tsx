'use client';

import { FC } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Button, Center, Stack, Text, TextInput, Title } from '@mantine/core';
import Logo from '~/components/Logo';
import TextLink from '~/components/TextLink';
import { useAuth } from '~/features/auth/useAuth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
  const { loginWithEmail } = useAuth();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const submit = async (values: LoginFormValues) => {
    const data = await loginWithEmail({
      email: values.email,
      password: values.password,
    });

    console.log(data);

    if (!data) {
      console.error('Login failed unexpectedly');
      return;
    }

    if (data.error) {
      console.error(data.error);
      return;
    }

    if (data.ok) {
      router.push(data.url ?? '/');
    }
  };

  return (
    <Center sx={{ padding: '1em', minHeight: '100vh' }}>
      <Stack>
        <Logo size='lg' />
        <form onSubmit={form.onSubmit(submit)}>
          <Stack sx={{ width: 'min(90vw, 350px)' }}>
            <Title order={2}>Login</Title>
            <TextInput
              label='Email'
              placeholder='Your email address'
              withAsterisk
              {...form.getInputProps('email')}
            />
            <TextInput
              type='password'
              label='Password'
              placeholder='Your password'
              withAsterisk
              {...form.getInputProps('password')}
            />
            {/* <TextLink type='router' to='/resetpassword' justify='end'>
            Forgot Password?
          </TextLink> */}
            <Button type='submit'>Login</Button>
            {/* <Divider label='OR' labelPosition='center' />
          <GoogleButton>Login with Google</GoogleButton>
          <FacebookButton>Login with Facebook</FacebookButton> */}
          </Stack>
        </form>
        <Text fz='sm' sx={{ display: 'flex', marginInline: 'auto' }}>
          Don&apos;t have an account?
          <TextLink type='router' href='/signup' sx={{ marginLeft: '0.6ch' }}>
            Sign Up
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default LoginPage;
