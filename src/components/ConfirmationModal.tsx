import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm: () => void;
}

const ConfirmationModal: FC<Props> = ({
  isOpen,
  onClose,
  title = 'Confirm',
  message = 'Are you sure?',
  onConfirm,
}) => {
  return (
    <Modal opened={isOpen} onClose={onClose} padding='md' title={title}>
      <Stack>
        <Text>{message}</Text>
        <Group>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
