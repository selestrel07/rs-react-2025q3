import { type FC, type ReactNode, useState } from 'react';
import './Main.css';
import { ArtistDetailedCard } from '../../features/artists/ArtistDetailedCard.tsx';
import { useSearchParams } from 'react-router';
import { ArtistList } from '../../features/artists/ArtistList.tsx';
import type { ArtistInfo } from '../../types/artist-data.ts';

export const MainPage: FC = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artist-id');
  const [artists, setArtists] = useState<ArtistInfo[]>([]);

  return (
    <>
      <main>
        <ArtistList artists={artists} setArtists={setArtists} />
        {artistId !== null ? (
          <ArtistDetailedCard
            id={
              artists.map((artist) => artist.id).includes(+artistId)
                ? artistId
                : '-1'
            }
          />
        ) : undefined}
      </main>
    </>
  );
};
