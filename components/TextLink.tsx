import { FC, ReactNode } from 'react';
import { Box, Sx, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  sx?: Sx;
  justify?: 'center' | 'start' | 'end';
  type: 'router' | 'hyper';
  href: string;
}

const RouterLink: FC<Props> = props => {
  return (
    <Text component={Link} {...props}>
      {props.children}
    </Text>
  );
};

const HyperLink: FC<Props> = props => {
  return (
    <Text component='a' {...props}>
      {props.children}
    </Text>
  );
};

const TextLink: FC<Props> = props => {
  const theme = useMantineTheme();

  const style: Sx = {
    width: 'max-content',
    color: theme.colors[theme.primaryColor][6],
    transition: 'color 0.1s ease',
    '&:hover': {
      color: theme.colors[theme.primaryColor][4],
    },
    ...(props.sx ?? {}),
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: props.justify || 'start',
        width: 'auto',
      }}
    >
      {props.type === 'router' ? (
        <RouterLink {...props} sx={style} />
      ) : (
        <HyperLink {...props} sx={style} />
      )}
    </Box>
  );
};

export default TextLink;
