import { type FC, type ReactNode, type MouseEvent } from 'react';
import './ArtistCard.css';
import type { ArtistCardProperties } from '../../types/component-properties.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';
import { addArtistAction, removeArtistAction } from './artistSlice.ts';

export const ArtistCard: FC<ArtistCardProperties> = (
  props: ArtistCardProperties
): ReactNode => {
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const dispatch = useAppDispatch();
  const isSelected = selectedArtists
    .map((artist) => artist.id)
    .includes(props.artist.id);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    props.navigate(props.artist.id);
    const selected = !isSelected;
    if (selected) {
      dispatch(addArtistAction(props.artist));
    } else {
      dispatch(removeArtistAction(props.artist));
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <input type="checkbox" checked={isSelected} />
      <p>
        <b>Title: </b>
        {props.artist.title}
      </p>
      <p>
        <b>Birth Date: </b>
        {props.artist.birth_date ?? '?'}
      </p>
      <p>
        <b>Date of Death: </b>
        {props.artist.death_date ?? '?'}
      </p>
    </div>
  );
};
