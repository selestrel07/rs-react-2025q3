import { type FC, type ReactNode } from 'react';
import './ArtistCard.css';
import type { ArtistCardProperties } from '../../types/component-properties.ts';

export const ArtistCard: FC<ArtistCardProperties> = (
  props: ArtistCardProperties
): ReactNode => {
  return (
    <div className="card">
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
