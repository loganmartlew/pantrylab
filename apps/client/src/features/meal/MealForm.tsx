import {
  Box,
  Button,
  ScrollArea,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { FC } from 'react';
import { z } from 'zod';
import {
  DebouncedTextSearch,
  useDebouncedTextSearch,
} from '~/components/DebouncedTextSearch';
import { Item } from '~/types';
import MealItemCard from './MealItemCard';

const mealSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(20, { message: 'Name must be less than 20 characters' }),
  description: z
    .string()
    .max(200, { message: 'Description must be less than 200 characters' })
    .default(''),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      created_at: z.date(),
      household_id: z.string(),
    })
  ),
});

export type MealFormValues = z.infer<typeof mealSchema>;

interface Props {
  searchFn: (query: string) => Promise<Item[]>;
  onSubmit: (values: MealFormValues) => void;
}

const MealForm: FC<Props> = ({ searchFn, onSubmit }) => {
  const searchProps = useDebouncedTextSearch<Item>(searchFn);

  const form = useForm<MealFormValues>({
    initialValues: {
      name: '',
      description: '',
      items: [],
    },
    validate: zodResolver(mealSchema),
  });

  const addItem = (item: Item) => {
    form.insertListItem('items', item);
  };

  const removeItem = (item: Item) => {
    const index = form.values.items.findIndex((i) => i.id === item.id);
    form.removeListItem('items', index);
  };

  const submit = async (values: MealFormValues) => {
    form.reset();
    onSubmit(values);
  };

  return (
    <Box component='form' onSubmit={form.onSubmit(submit)}>
      <Stack spacing='lg'>
        <Stack spacing='xs'>
          <Title order={4}>Details</Title>
          <TextInput
            label='Name'
            placeholder='Meal name'
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Textarea
            label='Description'
            placeholder='Meal description'
            maxRows={4}
            {...form.getInputProps('description')}
          />
        </Stack>

        <Stack spacing='xs'>
          <Title order={4}>Items</Title>
          <DebouncedTextSearch<Item>
            label='Item Name'
            placeholder='Search items'
            render={(item, clearSearch) => (
              <MealItemCard
                key={item.id}
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
              {form.values.items.map((item) => (
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
