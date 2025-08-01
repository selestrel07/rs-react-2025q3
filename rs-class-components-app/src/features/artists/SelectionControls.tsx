import type { FC } from 'react';
import './SelectionControls.css';
import { getArtists } from '../../store.ts';

export const SelectionControls: FC = () => {
  const selectedArtistsCount = getArtists().length;

  return (
    <div className="selection-controls">
      <p>{`${selectedArtistsCount} item${selectedArtistsCount === 1 ? ' is' : 's are'} selected`}</p>
      <div className="selection-buttons">
        <button>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
};
