import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import NavMenu from './NavMenu';

interface Props {}

const AppLayout: FC<Props> = () => {
  const [isMenuOpen, menuHandlers] = useDisclosure(false);

  const location = useLocation();

  useEffect(() => {
    menuHandlers.close();
  }, [location]);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} openMenu={menuHandlers.open} />
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={menuHandlers.close} />
      <Outlet />
    </>
  );
};

export default AppLayout;
