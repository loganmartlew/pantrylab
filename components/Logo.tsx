import { Box, Sx, Title, useMantineTheme } from '@mantine/core';
import { FC, useMemo } from 'react';
import Link from 'next/link';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: Sx;
  homeLink?: boolean;
}

const Logo: FC<Props> = ({ size, sx, homeLink }) => {
  const theme = useMantineTheme();

  const sizes = useMemo(
    () => ({
      xs: '1.5rem',
      sm: '2rem',
      md: '3rem',
      lg: '4rem',
      xl: '5rem',
    }),
    []
  );

  const logo = (
    <Title
      order={1}
      color={theme.primaryColor}
      fz={sizes[size || 'sm']}
      sx={sx}
    >
      Grocer
    </Title>
  );

  return homeLink ? (
    <Box component={Link} href='/' sx={{ textDecoration: 'none' }}>
      {logo}
    </Box>
  ) : (
    logo
  );
};

export default Logo;
