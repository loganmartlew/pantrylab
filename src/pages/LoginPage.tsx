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
import { useNavigate } from 'react-router-dom';
import TextLink from '~/components/TextLink';
import { GoogleButton, FacebookButton } from '~/components/SocialButtons';
import { supabase } from '~/lib/supabaseClient';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const submit = async (values: LoginFormValues) => {
    const auth = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (auth.error) {
      console.error(auth.error);
      return;
    }

    navigate('/');
  };

  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Stack>
        <Title order={1}>Grocer</Title>
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
          <TextLink type='router' to='/signup' sx={{ marginLeft: '0.6ch' }}>
            Sign Up
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default LoginPage;
