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
import { FC } from 'react';
import { FaCrown } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { User } from '~/types';

interface Props {
  user: User;
  isDeleteable?: boolean;
  isSelf?: boolean;
  isOwner?: boolean;
  isPending?: boolean;
}

const UserCard: FC<Props> = ({
  user,
  isDeleteable,
  isSelf,
  isOwner,
  isPending,
}) => {
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
            <ActionIcon size='md' color='red'>
              <MdDelete size={theme.fontSizes.xl} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Paper>
  );
};

export default UserCard;
