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
import { Navigate, useNavigate } from 'react-router-dom';
import TextLink from '~/components/TextLink';
import { GoogleButton, FacebookButton } from '~/components/SocialButtons';
import { supabase } from '~/lib/supabaseClient';
import { useAuth } from '~/features/auth/useAuth';
import Logo from '~/components/Logo';
import LoadingScreen from '~/components/LoadingScreen';

const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { signup, isAuthenticated, isLoading } = useAuth();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: zodResolver(signupSchema),
  });

  const submit = async (values: SignupFormValues) => {
    if (values.password !== values.confirmPassword) {
      form.setFieldError('confirmPassword', 'Passwords do not match');
      return;
    }

    const { error, data } = await supabase
      .from('users')
      .select()
      .eq('email', values.email);

    if (error) {
      console.error(error);
      return;
    }

    if (data.length > 0) {
      form.setFieldError('email', 'Email already linked to an account');
      return;
    }

    const session = await signup(
      values.email,
      values.password,
      values.firstName,
      values.lastName
    );

    if (session) {
      navigate('/');
    } else {
      navigate('/confirmemail');
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Center sx={{ padding: '1em', minHeight: '100vh' }}>
      <Stack>
        <Logo size='lg' />
        <form onSubmit={form.onSubmit(submit)}>
          <Stack sx={{ width: 'min(90vw, 350px)' }}>
            <Title order={2}>Sign up</Title>
            <TextInput
              label='First Name'
              placeholder='Your first name'
              withAsterisk
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label='Last Name'
              placeholder='Your last name'
              withAsterisk
              {...form.getInputProps('lastName')}
            />
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
            <TextInput
              type='password'
              label='Confirm Password'
              placeholder='Re-enter your password'
              withAsterisk
              {...form.getInputProps('confirmPassword')}
            />
            <Button type='submit'>Sign up</Button>
            {/* <Divider label='OR' labelPosition='center' />
          <GoogleButton>Login with Google</GoogleButton>
          <FacebookButton>Login with Facebook</FacebookButton> */}
          </Stack>
        </form>
        <Text fz='sm' sx={{ display: 'flex', marginInline: 'auto' }}>
          Already have an account?
          <TextLink type='router' to='/login' sx={{ marginLeft: '0.6ch' }}>
            Login
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default LoginPage;
