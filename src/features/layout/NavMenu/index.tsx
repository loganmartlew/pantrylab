import {
  Avatar,
  Divider,
  Drawer,
  Group,
  NavLink,
  ScrollArea,
  Select,
  Stack,
  Title,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { FC, useCallback } from 'react';
import {
  MdBookmarkBorder,
  MdCalendarToday,
  MdDashboard,
  MdFormatListBulleted,
  MdLogout,
  MdOutlineShoppingCart,
  MdSettings,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import TextLink from '~/components/TextLink';
import { useAuth } from '~/features/auth/useAuth';
import Footer from './Footer';

interface Props {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const NavMenu: FC<Props> = ({ isMenuOpen, closeMenu }) => {
  const theme = useMantineTheme();
  const { user } = useAuth();

  const initials = user ? user.first_name[0] + user.last_name[0] : '??';
  const name = user ? user.first_name + ' ' + user.last_name : 'Unknown User';

  const getNavLinkProps = useCallback(
    (path: string) => ({
      component: Link,
      to: path,
      active: location.pathname === path,
    }),
    []
  );

  return (
    <Drawer
      opened={isMenuOpen}
      onClose={closeMenu}
      title='Menu'
      padding='lg'
      size='full'
      sx={{
        '.mantine-Drawer-body': {
          height: `calc(100% - ${theme.spacing.lg * 2}px)`,
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Group>
          <Avatar radius='xl' size='lg' color={theme.primaryColor}>
            {initials}
          </Avatar>
          <Title order={3}>{name}</Title>
        </Group>
        <Select
          placeholder='Select a Household'
          data={['Adonis Place', 'Alexander Street']}
        />
        <Divider />
        <ScrollArea sx={{ flexGrow: 1 }}>
          <Stack>
            <NavLink
              label='Dashboard'
              icon={<MdDashboard />}
              {...getNavLinkProps('/')}
            />
            <NavLink
              label='Shopping List'
              icon={<MdFormatListBulleted />}
              {...getNavLinkProps('/list')}
            />
            <NavLink
              label='Meal Plan'
              icon={<MdCalendarToday />}
              {...getNavLinkProps('/mealplan')}
            />
            <NavLink
              label='Saved Meals'
              icon={<MdBookmarkBorder />}
              {...getNavLinkProps('/meals')}
            />
            <NavLink
              label='Grocery Items'
              icon={<MdOutlineShoppingCart />}
              {...getNavLinkProps('/items')}
            />
          </Stack>
        </ScrollArea>
        <Divider />
        <Stack>
          <NavLink
            label='Settings'
            icon={<MdSettings />}
            {...getNavLinkProps('/settings')}
          />
          <NavLink component='button' label='Logout' icon={<MdLogout />} />
        </Stack>
        <Footer />
      </Stack>
    </Drawer>
  );
};

export default NavMenu;
