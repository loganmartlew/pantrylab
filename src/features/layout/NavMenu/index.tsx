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
import { FC, useCallback, useEffect } from 'react';
import {
  MdBookmarkBorder,
  MdCalendarToday,
  MdDashboard,
  MdFormatListBulleted,
  MdLogout,
  MdOutlineShoppingCart,
  MdSettings,
  MdPeopleOutline,
  MdMail,
} from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '~/features/auth/useAuth';
import { useHousehold } from '~/features/household/useHousehold';
import Footer from './Footer';
import NewHouseholdForm from '~/features/household/NewHouseholdForm';
import { useInvite } from '~/features/invite/useInvite';

interface Props {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const NavMenu: FC<Props> = ({ isMenuOpen, closeMenu }) => {
  const [isHouseholdModalOpen, householdModalHandlers] = useDisclosure(false);

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { households, currentHousehold, setCurrentHouseholdId } =
    useHousehold();
  useInvite();

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

  const householdData = households.map(household => ({
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

  const onLogoutClick = async () => {
    await logout();
    navigate('/login');
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
            <ActionIcon size='lg' component={Link} to='/invites'>
              <MdMail size='1.5rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Select
          label='Household'
          placeholder='Select a Household'
          data={[{ value: '-1', label: 'New Household' }, ...householdData]}
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
            <NavLink
              label='Users'
              icon={<MdPeopleOutline />}
              {...getNavLinkProps('/users')}
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
