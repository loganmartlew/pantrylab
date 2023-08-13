import {
  ActionIcon,
  Group,
  Paper,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { MdAdd, MdCheck, MdDelete } from 'react-icons/md';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { Item } from '../../types';

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
  const [isDeleteModalOpen, deleteModalHandlers] = useDisclosure(false);

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
          <ActionIcon size='md' color='red' onClick={deleteModalHandlers.open}>
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
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={deleteModalHandlers.close}
        onConfirm={deleteItem}
        phraseToType={item.name}
        message='Are you sure you want to delete this item? This action cannot be undone.'
        description='Doing so will also remove it from any lists or meals it is currently added to.'
      />
    </Paper>
  );
};

export default ItemCard;
