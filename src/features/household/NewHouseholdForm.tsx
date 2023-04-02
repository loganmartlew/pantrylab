import { Box, Button, TextInput } from '@mantine/core';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { supabase } from '~/lib/supabase/supabaseClient';
import { useAuth } from '../auth/useAuth';
import { useHousehold } from './useHousehold';

interface Props {
  onClose?: () => void;
}

const NewHouseholdForm: FC<Props> = ({ onClose }) => {
  const [householdName, setHouseholdName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user } = useAuth();
  const { households, setCurrentHouseholdId } = useHousehold();

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHouseholdName(e.target.value);
    if (householdName) {
      setErrorMessage('');
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    const householdExists = households.find(
      household => household.name === householdName
    );

    if (householdExists) {
      setErrorMessage('You already have a household with that name');
      return;
    }

    if (!householdName.trim()) {
      setErrorMessage('Please enter a household name');
      return;
    }

    const { error: householdError, data: householdData } = await supabase
      .from('households')
      .insert({
        name: householdName,
        owner_id: user?.id,
      })
      .select();

    if (householdError) {
      console.error(householdError);
      return;
    }

    if (!householdData) {
      console.error('No data returned');
      return;
    }

    const { error: userError } = await supabase.from('household_users').insert({
      user_id: user?.id,
      household_id: householdData[0].id,
    });

    if (userError) {
      console.error(userError);
      return;
    }

    setCurrentHouseholdId(householdData[0].id);

    setHouseholdName('');
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box component='form' onSubmit={submit}>
      <TextInput
        label='Household Name'
        placeholder='New household name'
        value={householdName}
        onChange={onNameChange}
        error={errorMessage}
        autoFocus
        mb='sm'
      />
      <Button type='submit'>Create Household</Button>
    </Box>
  );
};

export default NewHouseholdForm;
