import {
  Box,
  Burger,
  Group,
  Drawer,
  Avatar,
  useMantineTheme,
  Title,
  Select,
} from '@mantine/core';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '~/components/Logo';
import { useAuth } from '../auth/useAuth';

interface Props {}

const AppLayout: FC<Props> = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close menu' : 'Open menu';

  const { user } = useAuth();
  const theme = useMantineTheme();

  const initials = user ? user.first_name[0] + user.last_name[0] : '??';
  const name = user ? user.first_name + ' ' + user.last_name : 'Unknown User';

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
          <Burger
            opened={opened}
            onClick={() => setOpened(o => !o)}
            title={title}
            color='hsl(0, 0%, 40%)'
          />
          <Logo size='sm' sx={{ transform: 'translateY(-0.075em)' }} homeLink />
        </Group>
      </Box>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title='Menu'
        padding='lg'
        size='full'
      >
        <Group>
          <Avatar radius='xl' size='lg' color={theme.primaryColor}>
            {initials}
          </Avatar>
          <Title order={3}>{name}</Title>
        </Group>
      </Drawer>
      <Outlet />
    </>
  );
};

export default AppLayout;
