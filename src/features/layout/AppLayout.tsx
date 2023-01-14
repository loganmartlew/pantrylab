import {
  Box,
  Burger,
  Group,
  Drawer,
  Avatar,
  useMantineTheme,
  Title,
  Select,
  Stack,
  Divider,
  NavLink,
  Text,
  ScrollArea,
} from '@mantine/core';
import { FC, useState, useCallback, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdFormatListBulleted,
  MdCalendarToday,
  MdBookmarkBorder,
  MdOutlineShoppingCart,
  MdSettings,
  MdLogout,
} from 'react-icons/md';
import Logo from '~/components/Logo';
import { useAuth } from '../auth/useAuth';
import TextLink from '~/components/TextLink';
import Header from './Header';

interface Props {}

const AppLayout: FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useAuth();
  const theme = useMantineTheme();
  const location = useLocation();

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <Header menuIsOpen={isMenuOpen} openMenu={() => setIsMenuOpen(true)} />
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
          <Group p='xs'>
            <Text size='xs' sx={{ flex: '1 0 0' }}>
              &copy; Grocer 2023
            </Text>
            <TextLink
              type='router'
              to='/privacy'
              sx={{ fontSize: theme.fontSizes.xs }}
            >
              Privacy
            </TextLink>
            <TextLink
              type='router'
              to='/terms'
              sx={{ fontSize: theme.fontSizes.xs }}
            >
              Terms
            </TextLink>
          </Group>
        </Stack>
      </Drawer>
      <Outlet />
    </>
  );
};

export default AppLayout;
