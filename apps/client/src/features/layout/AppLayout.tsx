'use client';

import { Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import Header from './Header';
import NavMenu from './NavMenu';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  const [isMenuOpen, menuHandlers] = useDisclosure(false);

  const pathname = usePathname();

  useEffect(() => {
    menuHandlers.close();
    // Need to exclude manuHandlers to prevent from always closing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Stack spacing={0}>
      <Header isMenuOpen={isMenuOpen} openMenu={menuHandlers.open} />
      <NavMenu isMenuOpen={isMenuOpen} closeMenu={menuHandlers.close} />
      {children}
    </Stack>
  );
};

export default AppLayout;
