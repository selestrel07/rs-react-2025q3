import {
  type ChangeEvent,
  type FC,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { setSearchString } from '../../services/local-storage.service.ts';
import type { SearchProperties } from '../../types/component-properties.ts';
import './SearchComponent.css';
import { useQueryString } from '../../hooks/UseQueryString.tsx';

export const SearchComponent: FC<SearchProperties> = (
  properties: SearchProperties
): ReactNode => {
  const { getQuery, setQuery } = useQueryString();
  const [currentValue, setCurrentValue] = useState(getQuery);
  const ref = useRef<HTMLInputElement>(null);

  const handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    const trimmedString = currentValue.trim();
    setCurrentValue(trimmedString);
    setQuery(trimmedString);
    properties.searchArtists(trimmedString);
    setSearchString(trimmedString);
  };

  return (
    <div className="search-wrapper">
      <input
        ref={ref}
        type="search"
        value={currentValue}
        placeholder="Type artist information..."
        onChange={handleQueryUpdate}
        disabled={properties.isLoading}
      />
      <button onClick={handleSearch} disabled={properties.isLoading}>
        Search
      </button>
    </div>
  );
};
