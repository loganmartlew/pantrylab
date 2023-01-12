import { ActionIcon, Box, Group } from '@mantine/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import Logo from '~/components/Logo';

interface Props {}

const AppLayout: FC<Props> = () => {
  return (
    <>
      <Box
        sx={{
          padding: '0.8em',
          borderBottom: 'thin solid hsl(0, 0%, 90%)',
          boxShadow: '0px 0px 5px hsla(0, 0%, 90%, 1)',
        }}
      >
        <Group align='center'>
          <ActionIcon size='lg'>
            <BiMenu fontSize='3rem' />
          </ActionIcon>
          <Logo size='sm' sx={{ transform: 'translateY(-0.075em)' }} />
        </Group>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
