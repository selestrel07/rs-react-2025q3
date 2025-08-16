import { type ReactNode } from 'react';
import './Main.css';
import ArtistData from '../components/artist/ArtistData';
import ArtistList from '../components/artist/ArtistList';
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
        <ArtistData id={artistId} isDetailed={true} />
      ) : undefined}
    </>
  );
}
