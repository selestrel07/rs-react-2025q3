import { type FC, type ReactNode } from 'react';
import type { ArtistInfo } from '../../types/artist-data.ts';
import './ArtistCard.css';

type ArtistCardProps = {
  artist: ArtistInfo;
};

export const ArtistCard: FC<ArtistCardProps> = (
  props: ArtistCardProps
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
