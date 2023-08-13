import {
  ActionIcon,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import ConfirmationModal from '../../components/ConfirmationModal';
import { Invite } from '../../types';

interface Props {
  invite: Invite;
  acceptInvite: (invite: Invite) => void;
  declineInvite: (invite: Invite) => void;
}

const HouseholdInvite: FC<Props> = ({
  invite,
  acceptInvite,
  declineInvite,
}) => {
  const [isAcceptModalOpen, acceptModalHandlers] = useDisclosure(false);
  const [isDeclineModalOpen, declineModalHandlers] = useDisclosure(false);

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
            onConfirm={() => acceptInvite(invite)}
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
            onConfirm={() => declineInvite(invite)}
            title='Decline Invite'
            message='Are you sure you want to decline the invitation?'
          />
        </Group>
      </Group>
    </Paper>
  );
};

export default HouseholdInvite;
