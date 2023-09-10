import { Button, ButtonProps } from '@mantine/core';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant='default'
      color='gray'
      {...props}
    />
  );
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      sx={(theme) => ({
        backgroundColor: '#4267B2',
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.fn.darken('#4267B2', 0.1),
        },
      })}
      {...props}
    />
  );
}
