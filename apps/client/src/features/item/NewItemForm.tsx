import { Box, Button, TextInput } from '@mantine/core';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Item } from '../../types';

interface Props {
  onSubmit: (name: string) => void;
  items: Item[];
}

const NewItemForm: FC<Props> = ({ onSubmit, items }) => {
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
      setErrorMessage('Please enter an item name');
      return;
    }

    const existingItem = items.find(
      (item) =>
        item.name.toLowerCase() === itemName.toLowerCase() ||
        item.name.trim().toLowerCase() === itemName.toLowerCase()
    );

    if (existingItem) {
      setErrorMessage('Item with this name already exists');
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
