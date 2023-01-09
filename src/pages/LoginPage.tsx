import { FC } from 'react';
import {
  Center,
  Stack,
  Title,
  TextInput,
  Text,
  Button,
  Divider,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextLink from '~/components/TextLink';
import { GoogleButton, FacebookButton } from '~/components/SocialButtons';
import { supabase } from '~/lib/supabaseClient';
import { useAuth } from '~/features/auth/useAuth';
import Logo from '~/components/Logo';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loginWithEmail } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const submit = async (values: LoginFormValues) => {
    await loginWithEmail(values.email, values.password);

    console.log('Navigate:', searchParams.get('redirectTo') || '/');
    navigate(searchParams.get('redirectTo') || '/');
  };

  return (
    <Center sx={{ minHeight: '100vh' }}>
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
          Don't have an account?
          <TextLink type='router' to='/' sx={{ marginLeft: '0.6ch' }}>
            Sign Up
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default LoginPage;
