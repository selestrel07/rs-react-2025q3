import { type FC, type ReactNode } from 'react';
import './Main.css';
import { ArtistDetailedCard } from '../../features/artists/ArtistDetailedCard.tsx';
import { useSearchParams } from 'react-router';
import { ArtistList } from '../../features/artists/ArtistList.tsx';

export const MainPage: FC = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artist-id');

  return (
    <>
      <main>
        <ArtistList />
        {artistId !== null ? <ArtistDetailedCard id={artistId} /> : undefined}
      </main>
    </>
  );
};
