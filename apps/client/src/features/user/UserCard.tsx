import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';
import { FaCrown } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ConfirmationModal from '../../components/ConfirmationModal';
import { User } from '../../types';

const removeUserMessage = 'Are you sure you want to remove this user?';
const removePendingUserMessage = 'Are you sure you want to cancel this invite?';

interface Props {
  user: User;
  isDeleteable?: boolean;
  isSelf?: boolean;
  isOwner?: boolean;
  isPending?: boolean;
  onDelete?: (id: string) => void;
}

const UserCard: FC<Props> = ({
  user,
  isDeleteable,
  isSelf,
  isOwner,
  isPending,
  onDelete,
}) => {
  const [isDeleteModalOpen, deleteModalHandlers] = useDisclosure(false);

  const theme = useMantineTheme();

  const initials = user ? user.first_name[0] + user.last_name[0] : '??';
  const name = user ? user.first_name + ' ' + user.last_name : 'Unknown User';

  return (
    <Paper shadow='xs' p='sm'>
      <Group align='center' spacing='md'>
        <Avatar radius='xl' size='md' color={theme.primaryColor}>
          {initials}
        </Avatar>
        <Stack spacing={0} justify='center' sx={{ flexGrow: 1 }}>
          <Group spacing='xs'>
            <Title order={4}>{name}</Title>
            {isSelf && <Text fz='xs'>{'(You)'}</Text>}
            {isPending && <Text fz='xs'>{'(Pending)'}</Text>}
            {isOwner && (
              <Tooltip label='Owner' position='right' withArrow>
                <Box>
                  <FaCrown color={theme.colors.yellow[5]} />
                </Box>
              </Tooltip>
            )}
          </Group>
          <Text fz='sm'>{user.email}</Text>
        </Stack>
        {isDeleteable && (
          <Tooltip label='Remove User' position='left' withArrow>
            <ActionIcon
              size='md'
              color='red'
              onClick={deleteModalHandlers.open}
            >
              <MdDelete size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={deleteModalHandlers.close}
        message={isPending ? removePendingUserMessage : removeUserMessage}
        onConfirm={() => {
          if (onDelete) onDelete(user.id);
        }}
      />
    </Paper>
  );
};

export default UserCard;
