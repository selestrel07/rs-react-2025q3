'use client';

import { type ReactNode } from 'react';
import './SelectionControls.css';
import { removeAllArtistsAction } from '../../store/artistSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useTranslations } from 'next-intl';

export default function SelectionControls(): ReactNode {
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const selectedArtistsCount = selectedArtists.length;
  const dispatch = useAppDispatch();
  const t = useTranslations('MainPage');

  if (selectedArtistsCount === 0) {
    return null;
  }

  return (
    <div className="selection-controls">
      <p>{`${selectedArtistsCount} ${selectedArtistsCount === 1 ? t('single-select') : t('multiple-select')}`}</p>
      <div className="selection-buttons">
        <button onClick={() => dispatch(removeAllArtistsAction())}>
          {t('unselect')}
        </button>
        <a href={`/en/api/download/?ids=${selectedArtists.join(',')}`} download>
          <button>{t('download')}</button>
        </a>
      </div>
    </div>
  );
}
