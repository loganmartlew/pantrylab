'use client';

import {
  ActionIcon,
  Avatar,
  Divider,
  Drawer,
  Group,
  Modal,
  NavLink,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useCallback } from 'react';
import {
  MdBookmarkBorder,
  MdCalendarToday,
  MdDashboard,
  MdFormatListBulleted,
  MdLogout,
  MdMail,
  MdMarkEmailUnread,
  MdOutlineShoppingCart,
  MdPeopleOutline,
  MdSettings,
} from 'react-icons/md';
import { useAuth } from '../../../features/auth/useAuth';
import NewHouseholdForm from '../../../features/household/NewHouseholdForm';
import { useHousehold } from '../../../features/household/useHousehold';
import { useInvite } from '../../../features/invite/useInvite';
import Footer from './Footer';

interface Props {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const NavMenu: FC<Props> = ({ isMenuOpen, closeMenu }) => {
  const [isHouseholdModalOpen, householdModalHandlers] = useDisclosure(false);

  const theme = useMantineTheme();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { households, currentHousehold, setCurrentHouseholdId } =
    useHousehold();
  const { hasPendingInvites } = useInvite();

  const initials = user ? user.firstName[0] + user.lastName[0] : '??';
  const name = user ? user.firstName + ' ' + user.lastName : 'Unknown User';

  const getNavLinkProps = useCallback(
    (path: string) => ({
      component: Link,
      href: path,
      active: pathname === path,
    }),
    [pathname],
  );

  const householdData = households.map((household) => ({
    label: household.name,
    value: household.id,
  }));

  const handleHouseholdChange = (householdId: string) => {
    if (householdId !== '-1') {
      setCurrentHouseholdId(householdId);
      return;
    }

    householdModalHandlers.open();
  };

  const onLogoutClick = () => {
    logout();
  };

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
          <Stack spacing={0} sx={{ flexGrow: 1 }}>
            <Title order={3}>{name}</Title>
            <Text size='xs'>{user ? user.email : 'Unknown Email'}</Text>
          </Stack>
          <Tooltip label='Invites' position='left'>
            <ActionIcon size='lg' component={Link} href='/app/invites'>
              {hasPendingInvites ? (
                <MdMarkEmailUnread size='1.5rem' />
              ) : (
                <MdMail size='1.5rem' />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
        <Select
          label='Household'
          placeholder='Select a Household'
          data={[{ value: '-1', label: 'New Household' }, ...householdData]}
          // data={[{ value: '-1', label: 'New Household' }]}
          value={currentHousehold?.id}
          onChange={handleHouseholdChange}
        />
        <Modal
          opened={isHouseholdModalOpen}
          onClose={householdModalHandlers.close}
          title='New Household'
        >
          <NewHouseholdForm onClose={householdModalHandlers.close} />
        </Modal>
        <Divider />
        <ScrollArea sx={{ flexGrow: 1 }}>
          <Stack>
            <NavLink
              label='Dashboard'
              icon={<MdDashboard />}
              {...getNavLinkProps('/app')}
            />
            <NavLink
              label='Shopping List'
              icon={<MdFormatListBulleted />}
              {...getNavLinkProps('/app/list')}
            />
            <NavLink
              label='Meal Plan'
              icon={<MdCalendarToday />}
              {...getNavLinkProps('/app/mealplan')}
            />
            <NavLink
              label='Saved Meals'
              icon={<MdBookmarkBorder />}
              {...getNavLinkProps('/app/meals')}
            />
            <NavLink
              label='Grocery Items'
              icon={<MdOutlineShoppingCart />}
              {...getNavLinkProps('/app/items')}
            />
            <NavLink
              label='Users'
              icon={<MdPeopleOutline />}
              {...getNavLinkProps('/app/users')}
            />
          </Stack>
        </ScrollArea>
        <Divider />
        <Stack>
          <NavLink
            label='Settings'
            icon={<MdSettings />}
            {...getNavLinkProps('/app/settings')}
          />
          <NavLink
            component='button'
            onClick={onLogoutClick}
            label='Logout'
            icon={<MdLogout />}
          />
        </Stack>
        <Footer />
      </Stack>
    </Drawer>
  );
};

export default NavMenu;
