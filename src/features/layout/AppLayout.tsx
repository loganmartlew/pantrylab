import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import NavMenu from './NavMenu';
import { Stack } from '@mantine/core';

interface Props {}

const AppLayout: FC<Props> = () => {
  const [isMenuOpen, menuHandlers] = useDisclosure(false);

  const location = useLocation();

  useEffect(() => {
    menuHandlers.close();
  }, [location]);

  return (
    <Stack spacing={0}>
      <Header isMenuOpen={isMenuOpen} openMenu={menuHandlers.open} />
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={menuHandlers.close} />
      <Outlet />
    </Stack>
  );
};

export default AppLayout;
