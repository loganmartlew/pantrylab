import {
  ActionIcon,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConfirmationModal from '~/components/ConfirmationModal';
import { supabase } from '~/lib/supabaseClient';
import { Invite } from '~/types';
import { useAuth } from '~/features/auth/useAuth';

interface Props {
  invite: Invite;
}

const HouseholdInvite: FC<Props> = ({ invite }) => {
  const [isAcceptModalOpen, acceptModalHandlers] = useDisclosure(false);
  const [isDeclineModalOpen, declineModalHandlers] = useDisclosure(false);

  const updateInviteStatus = async (status: 'accepted' | 'declined') => {
    supabase
      .from('household_user_invites')
      .update({ status })
      .eq('id', invite.id);
  };

  return (
    <Paper shadow='xs' p='sm'>
      <Group sx={{ justifyContent: 'space-between' }}>
        <Stack spacing={0}>
          <Title order={4}>{invite.household.name}</Title>
          <Text>Recieved {dayjs(invite.created_at).fromNow()}</Text>
        </Stack>
        <Group>
          <Tooltip label='Accept'>
            <ActionIcon
              variant='filled'
              color='green'
              onClick={acceptModalHandlers.open}
            >
              <MdCheck size='1.4rem' />
            </ActionIcon>
          </Tooltip>
          <ConfirmationModal
            isOpen={isAcceptModalOpen}
            onClose={acceptModalHandlers.close}
            onConfirm={() => updateInviteStatus('accepted')}
            title='Accept Invite'
            message='Are you sure you want to accept the invitation?'
          />

          <Tooltip label='Decline'>
            <ActionIcon
              variant='filled'
              color='red'
              onClick={declineModalHandlers.open}
            >
              <MdClose size='1.4rem' />
            </ActionIcon>
          </Tooltip>
          <ConfirmationModal
            isOpen={isDeclineModalOpen}
            onClose={declineModalHandlers.close}
            onConfirm={() => updateInviteStatus('declined')}
            title='Decline Invite'
            message='Are you sure you want to decline the invitation?'
          />
        </Group>
      </Group>
    </Paper>
  );
};

export default HouseholdInvite;
