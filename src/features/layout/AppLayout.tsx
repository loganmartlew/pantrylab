import { FC, useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import NavMenu from './NavMenu';

interface Props {}

const AppLayout: FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} openMenu={() => setIsMenuOpen(true)} />
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
      <Outlet />
    </>
  );
};

export default AppLayout;
