import {
  type ChangeEvent,
  type FC,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import './SearchComponent.css';
import { useQueryString } from '../../hooks/UseQueryString.tsx';
import type { SearchProperties } from '../../types/component-properties.ts';
import { useAppDispatch } from '../../hooks/store-hooks.ts';
import { removeAllArtistsAction } from '../artists/artistSlice.ts';

export const SearchComponent: FC<SearchProperties> = ({
  navigateToPage,
}): ReactNode => {
  const { getQuery, setQuery } = useQueryString();
  const [currentValue, setCurrentValue] = useState(getQuery);
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    const trimmedString = currentValue.trim();
    setCurrentValue(trimmedString);
    setQuery(trimmedString);
    navigateToPage();
    dispatch(removeAllArtistsAction());
  };

  return (
    <div className="search-wrapper">
      <input
        ref={ref}
        type="search"
        value={currentValue}
        placeholder="Type artist information..."
        onChange={handleQueryUpdate}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
