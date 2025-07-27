import { useEffect, useState } from 'react';
import {
  getSearchString,
  setSearchString,
} from '../services/local-storage.service.ts';

export const useQueryString = () => {
  const [query, setQuery] = useState(getSearchString());

  useEffect(() => {
    setSearchString(query);
  }, [query]);

  const getQuery = () => getSearchString();

  return {
    getQuery,
    setQuery,
  };
};
