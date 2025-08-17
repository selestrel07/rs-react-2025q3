'use client';

import { type ReactNode } from 'react';
import './SelectionControls.css';
import { removeAllArtistsAction } from '../../store/artistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';

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
        <button>Download</button>
      </div>
    </div>
  );
}
