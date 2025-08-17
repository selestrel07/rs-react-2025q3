'use client';

import { type ReactNode } from 'react';
import './SelectionControls.css';
import { removeAllArtistsAction } from '../../store/artistSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';

export default function SelectionControls(): ReactNode {
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const selectedArtistsCount = selectedArtists.length;
  const dispatch = useAppDispatch();

  if (selectedArtistsCount === 0) {
    return null;
  }

  return (
    <div className="selection-controls">
      <p>{`${selectedArtistsCount} item${selectedArtistsCount === 1 ? ' is' : 's are'} selected`}</p>
      <div className="selection-buttons">
        <button onClick={() => dispatch(removeAllArtistsAction())}>
          Unselect all
        </button>
        <a href={`/api/download/?ids=${selectedArtists.join(',')}`} download>
          <button>Download</button>
        </a>
      </div>
    </div>
  );
}
