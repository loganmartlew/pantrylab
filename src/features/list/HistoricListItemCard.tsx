import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Group,
  Menu,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
import { Item } from '~/types';

interface Props {
  item: Item;
  details: string;
}

const HistoricListItemCard: FC<Props> = ({ item, details }) => {
  return (
    <Paper shadow='xs' p='sm'>
      <Stack sx={{ flexGrow: 1, gap: 0 }}>
        <Title order={4}>{item.name}</Title>
        {details && (
          <Text size='sm' lineClamp={1}>
            {details}
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

export default HistoricListItemCard;
