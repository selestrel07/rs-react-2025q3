import { type FC, type ReactNode, useEffect, useState } from 'react';
import { SearchComponent } from '../../features/search/SearchComponent.tsx';
import {
  loadArtistData,
  searchArtistsPage,
} from '../../services/api.service.ts';
import type { SearchItem, SearchResult } from '../../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../../types/artist-data.ts';
import { ArtistCard } from '../../features/artists/ArtistCard.tsx';
import { getSearchString } from '../../services/local-storage.service.ts';
import { Pagination } from '../../features/paginaton/Pagination.tsx';
import './Main.css';

export const MainPage: FC = (): ReactNode => {
  const [artists, setArtists] = useState<ArtistInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    loadArtistsData(pageNumber, getSearchString());
  }, [pageNumber]);

  const loadArtistsData = (page: number, searchQuery: string) => {
    setLoading(true);
    setError(undefined);
    searchArtistsPage(page, searchQuery)
      .then(async (result: SearchResult) => {
        setPageCount(result.pagination.total_pages);
        const artistsData: ArtistData[] = await Promise.all(
          result.data.map((item: SearchItem) => loadArtistData(item.api_link))
        );
        setArtists(artistsData.map((artistData) => artistData.data));
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="data-container">
        <SearchComponent
          searchArtists={(qs: string) => {
            setPageNumber(1);
            loadArtistsData(pageNumber, qs);
          }}
          isLoading={loading}
        />
        <div className="cards-container">
          {artists.length > 0
            ? artists.map((item) => <ArtistCard key={item.id} artist={item} />)
            : [
                <p key="empty-message">
                  No results were found for the provided query.
                </p>,
              ]}
        </div>
        <Pagination
          pageNumber={pageNumber}
          pageCount={pageCount}
          setPageNumber={setPageNumber}
        />
      </div>
      {loading ? <div className="content-blur"></div> : undefined}
    </>
  );
};
