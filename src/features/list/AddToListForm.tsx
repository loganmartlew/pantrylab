import { Box, Button, Group, Stack } from '@mantine/core';
import { FC, FormEvent, useState } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import useDebouncedTextSearch from '~/hooks/useDebouncedTextSearch';
import { Item } from '~/types';
import { getHouseholdItems } from '~/features/item/itemApi';
import ListItemDisplayCard from './ListItemDisplayCard';
import { useHousehold } from '~/features/household/useHousehold';

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
  const [errorMessage, setErrorMessage] = useState<string>('');

  const searchProps = useDebouncedTextSearch(searchFn);
  const { results, debouncedSearchTerm, searchTerm, setSearchTerm } =
    searchProps;

  const { currentHousehold } = useHousehold();

  const canAdd = results.length <= 0 && debouncedSearchTerm.trim().length > 0;

  const addItem = (item: Item) => {
    addItemToList(item);
  };

  const addNewItem = async (e: FormEvent) => {
    e.preventDefault();

    if (!canAdd) return;

    if (!searchTerm.trim()) {
      setErrorMessage('Please enter an item name');
      return;
    }

    const householdItems = await getHouseholdItems(currentHousehold?.id ?? '');

    const existingItem = householdItems.find(
      item =>
        item.name.toLowerCase() === searchTerm.toLowerCase() ||
        item.name.trim().toLowerCase() === searchTerm.toLowerCase()
    );

    if (existingItem) {
      setErrorMessage('Item with this name already exists');
      return;
    }

    addNewItemToList(searchTerm);
    setSearchTerm('');
    setErrorMessage('');
  };

  return (
    <Box component='form' onSubmit={addNewItem}>
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
              error={errorMessage}
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
          {canAdd && (
            <Button type='submit' mt='1.75em'>
              New Item
            </Button>
          )}
        </Group>
      </Stack>
    </Box>
  );
};

export default AddToListForm;
