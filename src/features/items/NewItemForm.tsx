import { Box, Button, TextInput } from '@mantine/core';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

const NewItemForm: FC<Props> = ({ onSubmit }) => {
  const [itemName, setItemName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
    if (itemName) {
      setErrorMessage('');
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (!itemName.trim()) {
      setErrorMessage('Please enter a household name');
      return;
    }

    onSubmit(itemName);
    setItemName('');
    setErrorMessage('');
  };

  return (
    <Box component='form' onSubmit={submit}>
      <TextInput
        label='Item name'
        placeholder='New item name'
        value={itemName}
        onChange={onNameChange}
        error={errorMessage}
        autoFocus
        mb='sm'
      />
      <Button type='submit'>Add Item</Button>
    </Box>
  );
};

export default NewItemForm;
