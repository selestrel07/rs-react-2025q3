'use client';

import { type ChangeEvent, type ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './Search.css';

const REACT_CLASS_COMPONENTS_SEARCH_STRING =
  'react-class-components-search-string';

export default function Search(): ReactNode {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const query = localStorage.getItem(REACT_CLASS_COMPONENTS_SEARCH_STRING);
    if (query) {
      setQuery(query);
    }
  }, []);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    localStorage.setItem(REACT_CLASS_COMPONENTS_SEARCH_STRING, trimmedQuery);
    document.cookie = `search=${trimmedQuery}`;
    router.push(`/main/?page=1`);
  };

  return (
    <div className="search-wrapper">
      <input
        type="search"
        value={query}
        placeholder="Type artist information..."
        onChange={handleUserInput}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
