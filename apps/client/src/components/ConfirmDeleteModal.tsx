import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { FC, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  phraseToType: string;
  onConfirm: () => void;
  description?: string;
}

const ConfirmDeleteModal: FC<Props> = ({
  isOpen,
  onClose,
  title = 'Delete Item',
  message = 'Are you sure?',
  onConfirm,
  phraseToType,
  description,
}) => {
  const [phrase, setPhrase] = useState<string>('');

  const isPhraseCorrect = phrase === phraseToType;

  const onClick = () => {
    if (!isPhraseCorrect) return;

    onConfirm();
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} padding='md' title={title}>
      <Stack>
        <Text fw='bold'>{message}</Text>
        {description && <Text fz='sm'>{description}</Text>}
        <Text fz='sm'>
          Type{' '}
          <Text color='red' sx={{ display: 'inline' }}>
            {phraseToType}
          </Text>{' '}
          in the box below to continue
        </Text>
        <TextInput value={phrase} onChange={(e) => setPhrase(e.target.value)} />
        <Group>
          <Button color='red' disabled={!isPhraseCorrect} onClick={onClick}>
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

export default ConfirmDeleteModal;
