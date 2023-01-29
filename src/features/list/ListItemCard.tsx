import {
  ActionIcon,
  Checkbox,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
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
  const theme = useMantineTheme();

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
            <Menu.Item icon={<MdEdit />} onClick={() => console.log('Edit')}>
              Edit Details
            </Menu.Item>
            <Menu.Item color='red' icon={<MdDelete />} onClick={removeItem}>
              Remove Item
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Paper>
  );
};

export default ListItemCard;
