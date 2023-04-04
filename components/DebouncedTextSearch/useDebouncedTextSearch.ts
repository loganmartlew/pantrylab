import { useDebouncedValue } from '@mantine/hooks';
import { useState, useEffect } from 'react';

const useDebouncedTextSearch = <T>(
  fetchData: (searchTerm: string) => Promise<T[]>,
  debounce: number = 500
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm.trim(), debounce);

  const [results, setResults] = useState<T[]>([]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setResults([]);
      return;
    }

    fetchData(debouncedSearchTerm).then(setResults);
  }, [debouncedSearchTerm, fetchData]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    setResults,
    debouncedSearchTerm,
  };
};

export default useDebouncedTextSearch;
