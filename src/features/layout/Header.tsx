import { Box, Burger, Group } from '@mantine/core';
import { FC } from 'react';
import Logo from '~/components/Logo';

interface Props {
  isMenuOpen: boolean;
  openMenu: () => void;
}

const Header: FC<Props> = ({ isMenuOpen, openMenu }) => {
  const buttonTitle = isMenuOpen ? 'Close menu' : 'Open menu';

  return (
    <Box
      p='sm'
      sx={{
        borderBottom: 'thin solid hsl(0, 0%, 90%)',
        boxShadow: '0px 0px 3px hsla(0, 0%, 90%, 1)',
      }}
    >
      <Group align='center'>
        <Burger
          opened={isMenuOpen}
          onClick={openMenu}
          title={buttonTitle}
          color='hsl(0, 0%, 40%)'
        />
        <Logo size='sm' sx={{ transform: 'translateY(-0.075em)' }} homeLink />
      </Group>
    </Box>
  );
};

export default Header;
