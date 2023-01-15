import { Popover, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { FC, useEffect, useState } from 'react';

interface Props<T> {
  label: string;
  placeholder: string;
  fetchData: (searchTerm: string) => Promise<T[]>;
  render: (result: T, clearSearch: () => void) => JSX.Element;
  debounce?: number;
}

function DebouncedTextSearch<T>({
  label,
  placeholder,
  fetchData,
  render,
  debounce = 500,
}: Props<T>) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm.trim(), debounce);

  const [results, setResults] = useState<T[]>([]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }

    fetchData(debouncedSearchTerm).then(setResults);
  }, [debouncedSearchTerm]);

  return (
    <Popover opened={!!debouncedSearchTerm && !!searchTerm} position='bottom'>
      <Popover.Target>
        <TextInput
          label={label}
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          {!results || results.length < 1 ? (
            <Text>No results</Text>
          ) : (
            results.map(result => render(result, () => setSearchTerm('')))
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

export default DebouncedTextSearch;
