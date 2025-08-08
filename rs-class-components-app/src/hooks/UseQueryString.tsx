import { useEffect } from 'react';
import {
  getSearchString,
  setSearchString,
} from '../services/local-storage.service.ts';
import { useAppDispatch, useAppSelector } from './store-hooks.ts';
import { setSearchQuery } from '../features/search/searchQuerySlice.ts';

export const useQueryString = () => {
  const dispatch = useAppDispatch();
  const setQuery = (query: string) => dispatch(setSearchQuery(query));
  const query = useAppSelector((state) => state.searchQuery.query);

  useEffect(() => {
    setSearchString(query);
  }, [query]);

  const getQuery = () => {
    return query === '' ? (getSearchString() ?? query) : query;
  };

  return {
    getQuery,
    setQuery,
  };
};
