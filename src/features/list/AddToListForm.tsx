import { Box, Button, Group, Stack } from '@mantine/core';
import { FC, useState } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import useDebouncedTextSearch from '~/hooks/useDebouncedTextSearch';
import { Item } from '~/types';
import ListItemDisplayCard from './ListItemDisplayCard';

interface Props {
  searchFn: (searchTerm: string) => Promise<Item[]>;
  addItemToList: (item: Item) => void;
  addNewItemToList: (name: string) => void;
}

const AddToListForm: FC<Props> = ({
  searchFn,
  addItemToList,
  addNewItemToList,
}) => {
  const searchProps = useDebouncedTextSearch(searchFn);
  const { results, debouncedSearchTerm } = searchProps;

  const canAdd = results.length <= 0 && debouncedSearchTerm.trim().length > 0;

  const addItem = (item: Item) => {
    addItemToList(item);
  };

  const addNewItem = () => {};

  return (
    <Stack>
      <Group
        spacing='xs'
        align='flex-start'
        sx={{ transition: 'width 0.3s ease-in-out' }}
      >
        <Box sx={{ flex: '1 !important' }}>
          <DebouncedTextSearch<Item>
            label='Item Name'
            placeholder='Search items'
            render={(item, clearSearch) => (
              <ListItemDisplayCard
                item={item}
                details=''
                onClick={() => {
                  addItem(item);
                  clearSearch();
                }}
              />
            )}
            {...searchProps}
          />
        </Box>
        {canAdd && <Button mt='1.75em'>New Item</Button>}
      </Group>
    </Stack>
  );
};

export default AddToListForm;
