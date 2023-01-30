import { Stack, TextInput } from '@mantine/core';
import { FC } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import { Item } from '~/types';

interface Props {
  searchFn: (searchTerm: string) => Promise<Item[]>;
}

const AddToListForm: FC<Props> = ({ searchFn }) => {
  return (
    <Stack>
      <DebouncedTextSearch<Item>
        label='Item Name'
        placeholder='Search items'
        fetchData={searchFn}
        render={(item, clearSearch) => <p>{item.name}</p>}
      />
    </Stack>
  );
};

export default AddToListForm;
