import { type FC, type RefObject, useRef } from 'react';
import './SelectionControls.css';
import { removeAllArtistsAction } from './artistSlice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';

export const SelectionControls: FC = () => {
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const selectedArtistsCount = selectedArtists.length;
  const dispatch = useAppDispatch();
  const ref: RefObject<null | HTMLAnchorElement> = useRef(null);

  const download = () => {
    const content = selectedArtists
      .map(
        (artist) =>
          `${artist.id},${artist.title},${artist.birth_date},${artist.death_date}`
      )
      .join('\n');
    const file = new Blob([decodeURIComponent('%ef%bb%bf'), content], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(file);
    if (ref.current) {
      ref.current.href = url;
      ref.current.download = `${selectedArtistsCount}_item${selectedArtistsCount === 1 ? '' : 's'}.csv`;
      ref.current.click();
    }
  };

  return (
    <div className="selection-controls">
      <p>{`${selectedArtistsCount} item${selectedArtistsCount === 1 ? ' is' : 's are'} selected`}</p>
      <div className="selection-buttons">
        <a ref={ref} />
        <button onClick={() => dispatch(removeAllArtistsAction())}>
          Unselect all
        </button>
        <button onClick={download}>Download</button>
      </div>
    </div>
  );
};
