'use client';

import { type ChangeEvent, type ReactNode, useEffect, useState } from 'react';
import { useRouter } from '../../../../i18n/navigation';
import './Search.css';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '../../hooks/store-hooks';
import { removeAllArtistsAction } from '../../store/artistSlice';
import { setSearchCookie } from '../../actions/cookie-actions';

const REACT_CLASS_COMPONENTS_SEARCH_STRING =
  'react-class-components-search-string';

export default function Search(): ReactNode {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const t = useTranslations('MainPage');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = localStorage.getItem(REACT_CLASS_COMPONENTS_SEARCH_STRING);
    if (query) {
      setQuery(query);
    }
  }, []);

  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    localStorage.setItem(REACT_CLASS_COMPONENTS_SEARCH_STRING, trimmedQuery);
    await setSearchCookie(trimmedQuery);
    dispatch(removeAllArtistsAction());
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
      <button onClick={handleSearch}>{t('search')}</button>
    </div>
  );
}
