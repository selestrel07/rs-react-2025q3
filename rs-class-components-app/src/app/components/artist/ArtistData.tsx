import type { ArtistData } from '../../../types/artist-data';
import type { ReactNode } from 'react';
import { fetchArtistData } from '../../api/data-fetch';

export default async function ArtistData({
  id,
  isDetailed,
}: {
  id: number;
  isDetailed: boolean;
}): Promise<ReactNode> {
  const artistData = await fetchArtistData(id);
  const artist: ArtistData = await artistData.json();

  return (
    <div className={`artist-data${isDetailed ? ' column' : ''}`}>
      {artistData.status === 404 ? (
        <p>No data was found for the provided id.</p>
      ) : (
        <>
          <p>
            <span>
              <b>Title: </b>
            </span>
            <span>{artist.data.title}</span>
          </p>
          <p>
            <span>
              <b>Birth Date: </b>
            </span>
            <span>{artist.data.birth_date ?? '?'}</span>
          </p>
          <p>
            <span>
              <b>Date of Death: </b>
            </span>
            <span>{artist.data.death_date ?? '?'}</span>
          </p>
          {isDetailed ? (
            <p>
              <span>
                <b>Alternative titles: </b>
              </span>
              <span>
                {artist.data.alt_titles
                  ? artist.data.alt_titles.join(', ')
                  : 'No Alternative titles'}
              </span>
            </p>
          ) : undefined}
        </>
      )}
    </div>
  );
}
