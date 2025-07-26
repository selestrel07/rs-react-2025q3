import { type ChangeEvent, type FC, type ReactNode, useState } from 'react';
import {
  getSearchString,
  setSearchString,
} from '../../services/local-storage.service.ts';
import type { SearchProperties } from '../../types/component-properties.ts';
import './SearchComponent.css';

export const SearchComponent: FC<SearchProperties> = (
  properties: SearchProperties
): ReactNode => {
  const [query, setQuery] = useState(getSearchString());

  const handleQueryUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toString());
  };

  const handleSearch = () => {
    const trimmedString = query.trim();
    setQuery(trimmedString);
    properties.searchArtists(trimmedString);
    setSearchString(trimmedString);
  };

  return (
    <div className="search-wrapper">
      <input
        type="search"
        value={query}
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
