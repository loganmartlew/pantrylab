import {
  ActionIcon,
  Group,
  Paper,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
import { MdAdd, MdCheck, MdDelete } from 'react-icons/md';
import { Item } from '~/types';

interface Props {
  item: Item;
  addedToList?: boolean;
  deleteItem: () => void;
  addToList: () => void;
  removeFromList: () => void;
}

const ItemCard: FC<Props> = ({
  item,
  addedToList,
  deleteItem,
  addToList,
  removeFromList,
}) => {
  const theme = useMantineTheme();

  return (
    <Paper shadow='xs' p='sm'>
      <Group spacing='sm'>
        <Title order={4} color={addedToList ? theme.primaryColor : ''}>
          {item.name}
        </Title>
        <Text fz='xs' sx={{ flex: '1 !important' }}>
          {addedToList ? 'In list' : ''}
        </Text>
        <Tooltip label='Delete Item' position='left' withArrow>
          <ActionIcon size='md' color='red' onClick={deleteItem}>
            <MdDelete size={theme.fontSizes.xl} />
          </ActionIcon>
        </Tooltip>
        {!addedToList && (
          <Tooltip label='Add to list' position='left' withArrow>
            <ActionIcon
              variant='filled'
              size='md'
              color={theme.primaryColor}
              onClick={addToList}
            >
              <MdAdd size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        )}
        {addedToList && (
          <Tooltip label='Remove from list' position='left' withArrow>
            <ActionIcon
              variant='light'
              size='md'
              color={theme.primaryColor}
              onClick={removeFromList}
            >
              <MdCheck size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Paper>
  );
};

export default ItemCard;
