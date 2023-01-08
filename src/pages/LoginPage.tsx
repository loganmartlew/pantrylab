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
import { Link } from 'react-router-dom';
import TextLink from '~/components/TextLink';
import { GoogleButton, FacebookButton } from '~/components/SocialButtons';

const LoginPage: FC = () => {
  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Stack>
        <Title order={1}>Grocer</Title>
        <Stack sx={{ width: 'min(90vw, 350px)' }}>
          <Title order={2}>Login</Title>
          <TextInput label='Email' placeholder='Your Email' withAsterisk />
          <TextInput
            type='password'
            label='Password'
            placeholder='Your Password'
            withAsterisk
          />
          <TextLink type='router' to='/resetpassword' justify='end'>
            Forgot Password?
          </TextLink>
          <Button>Login</Button>
          <Divider label='OR' labelPosition='center' />
          <GoogleButton>Login with Google</GoogleButton>
          <FacebookButton>Login with Facebook</FacebookButton>
        </Stack>
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
