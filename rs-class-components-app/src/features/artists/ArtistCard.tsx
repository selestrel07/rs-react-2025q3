import {
  type FC,
  type ReactNode,
  type MouseEvent,
  type ChangeEvent,
  useRef,
} from 'react';
import './ArtistCard.css';
import type { ArtistCardProperties } from '../../types/component-properties.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks.ts';
import { addArtistAction, removeArtistAction } from './artistSlice.ts';
import { useGetArtistQuery } from '../../services/api.service.ts';

export const ArtistCard: FC<ArtistCardProperties> = (
  properties: ArtistCardProperties
): ReactNode => {
  const selectedArtists = useAppSelector((state) => state.artists.value);
  const dispatch = useAppDispatch();
  const isSelected = selectedArtists
    .map((artist) => artist.id)
    .includes(+properties.id);
  const ref = useRef<HTMLInputElement | null>(null);
  const { data, isLoading } = useGetArtistQuery(`${properties.id}`);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    properties.navigate(properties.id);
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>): void => {
    if (data) {
      if (e.target.checked) {
        dispatch(addArtistAction(data));
      } else {
        dispatch(removeArtistAction(data));
      }
    }
  };

  if (isLoading) {
    return <div className="card">Loading...</div>;
  }

  if (data === null || data === undefined) {
    return (
      <div className="card">
        <p>No artist was found by provided id.</p>
      </div>
    );
  }

  return (
    <div className="card" onClick={handleClick}>
      <input
        ref={ref}
        type="checkbox"
        onChange={handleUpdate}
        onClick={(e) => {
          e.stopPropagation();
          properties.navigate(data.id);
        }}
        checked={isSelected}
        data-testid="artist-checkbox"
      />
      <p>
        <b>Title: </b>
        {data.title}
      </p>
      <p>
        <b>Birth Date: </b>
        {data.birth_date ?? '?'}
      </p>
      <p>
        <b>Date of Death: </b>
        {data.death_date ?? '?'}
      </p>
    </div>
  );
};
