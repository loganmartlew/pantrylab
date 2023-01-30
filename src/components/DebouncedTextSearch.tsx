import { Popover, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { FC, useEffect, useState } from 'react';

interface Props<T> {
  label?: string;
  placeholder?: string;
  render: (result: T, clearSearch: () => void) => JSX.Element;
  popover?: boolean;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  debouncedSearchTerm: string;
  results: T[];
  setResults: (results: T[]) => void;
  error?: string;
}

function DebouncedTextSearch<T>({
  label,
  placeholder,
  render,
  popover,
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm,
  results,
  setResults,
  error,
}: Props<T>) {
  const textInput = (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={searchTerm}
      name='search'
      onChange={e => setSearchTerm(e.target.value)}
      error={error}
    />
  );

  const resultsList = searchTerm.trim() && (
    <Stack>
      {!results || results.length < 1 ? (
        <Text>No results</Text>
      ) : (
        results.map(result => render(result, () => setSearchTerm('')))
      )}
    </Stack>
  );

  if (popover)
    return (
      <Popover opened={!!debouncedSearchTerm && !!searchTerm} position='bottom'>
        <Popover.Target>{textInput}</Popover.Target>
        <Popover.Dropdown>{resultsList}</Popover.Dropdown>
      </Popover>
    );

  return (
    <Stack>
      {textInput}
      {resultsList}
    </Stack>
  );
}

export default DebouncedTextSearch;
