import { Box, Sx } from '@mantine/core';
import { FC, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import textLogoWhite from '../../public/logo/PantryLab_TextLogo_White.svg';
import textLogoBlack from '../../public/logo/PantryLab_TextLogo_Black.svg';
import textLogoPrimary from '../../public/logo/PantryLab_TextLogo_Primary.svg';
import textWhite from '../../public/logo/PantryLab_Text_White.svg';
import textBlack from '../../public/logo/PantryLab_Text_Black.svg';
import textPrimary from '../../public/logo/PantryLab_Text_White.svg';
import logoWhite from '../../public/logo/PantryLab_Logo_Primary.svg';
import logoBlack from '../../public/logo/PantryLab_Logo_Black.svg';
import logoPrimary from '../../public/logo/PantryLab_Logo_Primary.svg';

interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: Sx;
  homeLink?: boolean;
  variant?: 'text' | 'logo' | 'textLogo';
  color?: 'white' | 'black' | 'primary';
}

const Logo: FC<Props> = ({
  size = 'md',
  sx,
  homeLink,
  variant = 'textLogo',
  color = 'primary',
}) => {
  const sizes = useMemo(
    () => ({
      xs: '1.5em',
      sm: '2em',
      md: '3em',
      lg: '4em',
      xl: '5em',
    }),
    []
  );

  const logoVector = useMemo(() => {
    const map = {
      text: {
        white: textWhite,
        black: textBlack,
        primary: textPrimary,
      },
      logo: {
        white: logoWhite,
        black: logoBlack,
        primary: logoPrimary,
      },
      textLogo: {
        white: textLogoWhite,
        black: textLogoBlack,
        primary: textLogoPrimary,
      },
    };
    return map[variant][color];
  }, [variant, color]);

  const logo = (
    <Box component='span'>
      <Image
        priority
        src={logoVector}
        alt='Pantry Lab'
        style={{ height: sizes[size], width: 'max-content' }}
      />
    </Box>
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
