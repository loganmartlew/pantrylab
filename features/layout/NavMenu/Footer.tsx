import { Group, Text, useMantineTheme } from '@mantine/core';
import { FC } from 'react';
import TextLink from '~/components/TextLink';

interface Props {}

const Footer: FC<Props> = () => {
  const theme = useMantineTheme();

  return (
    <Group p='xs'>
      <Text size='xs' sx={{ flex: '1 0 0' }}>
        &copy; Grocer 2023
      </Text>
      <TextLink
        type='router'
        to='/privacy'
        sx={{ fontSize: theme.fontSizes.xs }}
      >
        Privacy
      </TextLink>
      <TextLink type='router' to='/terms' sx={{ fontSize: theme.fontSizes.xs }}>
        Terms
      </TextLink>
    </Group>
  );
};

export default Footer;
