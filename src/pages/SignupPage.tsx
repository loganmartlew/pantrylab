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
import TextLink from '~/components/TextLink';
import { GoogleButton, FacebookButton } from '~/components/SocialButtons';

const LoginPage: FC = () => {
  return (
    <Center sx={{ minHeight: '100vh' }}>
      <Stack>
        <Title order={1}>Grocer</Title>
        <Stack sx={{ width: 'min(90vw, 350px)' }}>
          <Title order={2}>Sign up</Title>
          <TextInput
            label='First Name'
            placeholder='Your first name'
            withAsterisk
          />
          <TextInput
            label='Last Name'
            placeholder='Your last name'
            withAsterisk
          />
          <TextInput
            label='Email'
            placeholder='Your email address'
            withAsterisk
          />
          <TextInput
            type='password'
            label='Password'
            placeholder='Your password'
            withAsterisk
          />
          <TextInput
            type='password'
            label='Confirm Password'
            placeholder='Re-enter your password'
            withAsterisk
          />
          <Button>Sign up</Button>
          {/* <Divider label='OR' labelPosition='center' />
          <GoogleButton>Login with Google</GoogleButton>
          <FacebookButton>Login with Facebook</FacebookButton> */}
        </Stack>
        <Text fz='sm' sx={{ display: 'flex', marginInline: 'auto' }}>
          Already have an account?
          <TextLink type='router' to='/signup' sx={{ marginLeft: '0.6ch' }}>
            Login
          </TextLink>
        </Text>
      </Stack>
    </Center>
  );
};

export default LoginPage;
