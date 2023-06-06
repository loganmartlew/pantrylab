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
import { useDisclosure } from '@mantine/hooks';
import { FC, FormEvent, useRef } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Item } from '~/types';

interface Props {
  item: Item;
  details: string;
  completeItem: () => void;
  removeItem: () => void;
  editItemDetails: (details: string) => void;
}

const ListItemCard: FC<Props> = ({
  item,
  details,
  completeItem,
  editItemDetails,
  removeItem,
}) => {
  const [isEditModalOpen, editModalHandlers] = useDisclosure(false);
  const theme = useMantineTheme();

  const detailsRef = useRef<HTMLInputElement>(null);

  const saveDetails = (e: FormEvent) => {
    e.preventDefault();
    if (detailsRef.current) {
      editItemDetails(detailsRef.current.value);
    }
    editModalHandlers.close();
  };

  return (
    <Paper shadow='xs' p='sm'>
      <Group spacing='sm' align='flex-start'>
        <Checkbox radius='xl' size='sm' pt='0.2em' onClick={completeItem} />
        <Stack sx={{ flexGrow: 1, gap: 0 }}>
          <Title order={4}>{item.name}</Title>
          {details && (
            <Text size='sm' lineClamp={1}>
              {details}
            </Text>
          )}
        </Stack>
        <Menu position='bottom-end'>
          <Menu.Target>
            <ActionIcon>
              <BiDotsVerticalRounded size={theme.fontSizes.xl} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<MdEdit />} onClick={editModalHandlers.open}>
              Edit Details
            </Menu.Item>
            <Menu.Item color='red' icon={<MdDelete />} onClick={removeItem}>
              Remove Item
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Modal
        opened={isEditModalOpen}
        onClose={editModalHandlers.close}
        title='Edit Item'
      >
        <Box component='form' onSubmit={saveDetails}>
          <Title order={4} mb='sm'>
            {item.name}
          </Title>
          <TextInput
            label='Item Details'
            placeholder='Details'
            mb='sm'
            ref={detailsRef}
            defaultValue={details}
          />
          <Button type='submit'>Save</Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default ListItemCard;
