import { Box, Title } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  title: string;
  subtitle?: string;
}

const PageWrapper: FC<Props> = ({ children, title, subtitle }) => {
  return (
    <Box p='md'>
      <Box mb='md'>
        <Title order={1}>{title}</Title>
        {subtitle && (
          <Title order={3} fw='normal'>
            {subtitle}
          </Title>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default PageWrapper;
