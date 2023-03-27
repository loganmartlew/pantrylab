import { Button, ButtonProps } from '@mantine/core';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { BsFacebook as FacebookIcon } from 'react-icons/bs';

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
      sx={theme => ({
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
