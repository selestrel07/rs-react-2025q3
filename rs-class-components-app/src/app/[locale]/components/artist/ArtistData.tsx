import type { ArtistData } from '../../types/artist-data';
import type { ReactNode } from 'react';
import { fetchArtistData } from '../../api/data-fetch';
import { getTranslations } from 'next-intl/server';

export default async function ArtistData({
  id,
  isDetailed,
}: {
  id: number;
  isDetailed: boolean;
}): Promise<ReactNode> {
  const artistData = await fetchArtistData(id);
  const artist: ArtistData = await artistData.json();
  const t = await getTranslations('MainPage');

  return (
    <div className={`artist-data${isDetailed ? ' column' : ''}`}>
      {artistData.status === 404 ? (
        <p>No data was found for the provided id.</p>
      ) : (
        <>
          <p>
            <span>
              <b>{t('title')}</b>
            </span>
            <span>{artist.data.title}</span>
          </p>
          <p>
            <span>
              <b>{t('birth-date')}</b>
            </span>
            <span>{artist.data.birth_date ?? '?'}</span>
          </p>
          <p>
            <span>
              <b>{t('death-date')}</b>
            </span>
            <span>{artist.data.death_date ?? '?'}</span>
          </p>
          {isDetailed ? (
            <p>
              <span>
                <b>{t('alt-titles')}</b>
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
