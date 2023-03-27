import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { FC } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { User } from '~/types';

interface Props {
  user: User;
  onClick?: () => void;
  isDeleteable?: boolean;
  onDelete?: (id: string) => void;
}

const UserInviteCard: FC<Props> = ({
  user,
  onClick,
  isDeleteable,
  onDelete,
}) => {
  const theme = useMantineTheme();

  const initials = user ? user.first_name[0] + user.last_name[0] : '??';
  const name = user ? user.first_name + ' ' + user.last_name : 'Unknown User';

  return (
    <Paper
      shadow='xs'
      p='sm'
      onClick={onClick}
      sx={{
        minWidth: '250px',
        '&:hover': { backgroundColor: `hsl(0, 0%, 95%)` },
      }}
    >
      <Group align='center' spacing='md'>
        <Avatar radius='xl' size='md' color={theme.primaryColor}>
          {initials}
        </Avatar>
        <Stack spacing={0} justify='center' sx={{ flexGrow: 1 }}>
          <Title order={4}>{name}</Title>
          <Text fz='sm'>{user.email}</Text>
        </Stack>
        {isDeleteable && onDelete && (
          <Tooltip label='Remove User' position='left' withArrow>
            <ActionIcon size='md' onClick={() => onDelete(user.id)}>
              <MdRemoveCircleOutline size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Paper>
  );
};

export default UserInviteCard;
