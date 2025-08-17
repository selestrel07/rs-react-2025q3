import type { SearchResult } from '../../types/search-item';
import type { ReactNode } from 'react';
import Pagination from '../pagination/Pagination';
import ArtistCard from './ArtistCard';
import ArtistData from './ArtistData';
import SelectionControls from './SelectionControls';
import Search from '../search/Search';

const ENTITY_LIMIT = 8;

export default async function ArtistList({
  query,
  pageNumber,
}: {
  query: string;
  pageNumber: string;
}): Promise<ReactNode> {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artists/search/?limit=${ENTITY_LIMIT}&page=${pageNumber}&q=${query}`,
    {
      cache: 'force-cache',
      next: {
        revalidate: 3600,
        tags: ['artist'],
      },
    }
  );
  const artists: SearchResult = await response.json();

  return (
    <div className="data-container">
      <Search />
      <div className="cards-container">
        {artists.data.length > 0 ? (
          artists.data.map((artist) => (
            <ArtistCard key={artist.id} id={artist.id} pageNumber={pageNumber}>
              <ArtistData id={artist.id} isDetailed={false} />
            </ArtistCard>
          ))
        ) : (
          <p>No data.</p>
        )}
      </div>
      <SelectionControls />
      <Pagination
        currentPage={+pageNumber}
        totalPages={artists.pagination.total_pages}
      />
    </div>
  );
}
