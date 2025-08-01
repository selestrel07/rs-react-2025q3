import type { FC } from 'react';
import './SelectionControls.css';
import { removeAllArtistsAction } from './artistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';

export const SelectionControls: FC = () => {
  const selectedArtistsCount = useAppSelector(
    (state) => state.artists.value
  ).length;
  const dispatch = useAppDispatch();

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
};
