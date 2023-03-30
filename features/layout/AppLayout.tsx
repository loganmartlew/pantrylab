'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Header from './Header';
import NavMenu from './NavMenu';
import { Stack } from '@mantine/core';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  const [isMenuOpen, menuHandlers] = useDisclosure(false);

  const pathname = usePathname();

  useEffect(() => {
    menuHandlers.close();
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
