'use client';

import { FC } from 'react';
import { Center, Stack, Title, TextInput, Text, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import TextLink from '~/components/TextLink';
import { useAuth } from '~/features/auth/useAuth';
import Logo from '~/components/Logo';
import { usePathname, useSearchParams } from 'next/navigation';
import { getUrlWithRedirected } from '~/util/getUrlWithRedirected';

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

const SignupPage: FC = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const { signup } = useAuth();

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

    // const { error, data } = await supabase
    //   .from('users')
    //   .select()
    //   .eq('email', values.email);

    // if (error) {
    //   console.error(error);
    //   return;
    // }

    // if (data.length > 0) {
    //   form.setFieldError('email', 'Email already linked to an account');
    //   return;
    // }

    await signup({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

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
          <TextLink
            type='router'
            href={getUrlWithRedirected('/auth/login', false, params, pathname)}
            sx={{ marginLeft: '0.6ch' }}
          >
            Login
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default SignupPage;
