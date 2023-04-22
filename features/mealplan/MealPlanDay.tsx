import {
  Box,
  Button,
  Group,
  Stack,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import dayjs from 'dayjs';
import { FC } from 'react';
import { MdAdd, MdToday } from 'react-icons/md';

interface Props {
  date: Date;
  addMealClick: (date: Date) => void;
}

const MealPlanDay: FC<Props> = ({ date, addMealClick }) => {
  const theme = useMantineTheme();

  const isToday = dayjs(date).isSame(dayjs(), 'date');

  return (
    <Stack spacing='xs'>
      <Group spacing='xs'>
        {isToday && (
          <Tooltip label='Today'>
            <Box mt='0.4rem'>
              <MdToday
                fontSize='1rem'
                color={theme.colors[theme.primaryColor][6]}
              />
            </Box>
          </Tooltip>
        )}
        <Title order={3}>{dayjs(date).format('dddd')}</Title>
      </Group>
      <Button
        size='xs'
        variant='light'
        leftIcon={<MdAdd size='1rem' />}
        onClick={() => addMealClick(date)}
        sx={{ width: 'max-content' }}
      >
        Add Meal
      </Button>
    </Stack>
  );
};

export default MealPlanDay;
