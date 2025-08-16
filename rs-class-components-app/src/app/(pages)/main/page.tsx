import { type ReactNode } from 'react';
import './Main.css';
import ArtistData from '../../components/artist/ArtistData';
import ArtistList from '../../components/artist/ArtistList';
import ArtistDetailedCard from '../../components/artist/ArtistDetailedCard';
type SearchParams = Record<string, string | string[] | undefined>;

export default async function MainPage(props: {
  searchParams: Promise<SearchParams>;
}): Promise<ReactNode> {
  const searchParams = await props.searchParams;
  const artistId = (searchParams['artist-id'] as string) ?? '';
  const pageNumber = (searchParams['page'] as string) ?? '1';

  return (
    <>
      <ArtistList query={'terry'} pageNumber={pageNumber} />
      {artistId !== '' ? (
        <ArtistDetailedCard pageNumber={pageNumber}>
          <ArtistData id={+artistId} isDetailed={true} />
        </ArtistDetailedCard>
      ) : undefined}
    </>
  );
}
