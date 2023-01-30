import {
  Box,
  Button,
  ScrollArea,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { FC, FormEvent, useState } from 'react';
import DebouncedTextSearch from '~/components/DebouncedTextSearch';
import useDebouncedTextSearch from '~/hooks/useDebouncedTextSearch';
import { Item } from '~/types';
import ListItemDisplayCard from '../list/ListItemDisplayCard';
import MealItemCard from './MealItemCard';

interface Props {
  searchFn: (query: string) => Promise<Item[]>;
}

const MealForm: FC<Props> = ({ searchFn }) => {
  const [items, setItems] = useState<Item[]>([]);

  const searchProps = useDebouncedTextSearch<Item>(searchFn);
  const {} = searchProps;

  const addItem = (item: Item) => {
    setItems(items => [...items, item]);
  };

  const removeItem = (item: Item) => {
    setItems(items => items.filter(i => i.id !== item.id));
  };

  return (
    <Box component='form'>
      <Stack spacing='lg'>
        <Stack spacing='xs'>
          <Title order={4}>Details</Title>
          <TextInput label='Name' placeholder='Meal name' />
          <Textarea
            label='Description'
            placeholder='Meal description'
            maxRows={4}
          />
        </Stack>

        <Stack spacing='xs'>
          <Title order={4}>Items</Title>
          <DebouncedTextSearch<Item>
            label='Item Name'
            placeholder='Search items'
            render={(item, clearSearch) => (
              <MealItemCard
                item={item}
                onClick={() => {
                  addItem(item);
                  clearSearch();
                }}
              />
            )}
            popover
            {...searchProps}
          />
          <ScrollArea>
            <Stack p='0.3em'>
              {items.map(item => (
                <MealItemCard
                  key={item.id}
                  item={item}
                  onDelete={() => removeItem(item)}
                  deleteable
                />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>

        <Button type='submit'>Create Meal</Button>
      </Stack>
    </Box>
  );
};

export default MealForm;
