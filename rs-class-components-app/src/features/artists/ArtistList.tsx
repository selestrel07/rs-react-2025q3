import { type FC, useEffect, useState } from 'react';
import { SearchComponent } from '../search/SearchComponent.tsx';
import { Pagination } from '../paginaton/Pagination.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import type { ArtistData, ArtistInfo } from '../../types/artist-data.ts';
import { ArtistCard } from './ArtistCard.tsx';
import {
  loadArtistData,
  searchArtistsPage,
} from '../../services/api.service.ts';
import type { SearchItem, SearchResult } from '../../types/search-item.ts';
import { MAIN } from '../../data/path-constants.ts';
import { useQueryString } from '../../hooks/UseQueryString.tsx';
import { SelectionControls } from './SelectionControls.tsx';
import { useAppSelector } from '../../hooks/store-hooks.ts';

const composeNavigateLink = (
  pageNumber: number,
  artistId: string | null
): string => {
  return `${MAIN}/?page=${pageNumber}${artistId ? `&artist-id=${artistId}` : ''}`;
};

export const ArtistList: FC<{
  artists: ArtistInfo[];
  setArtists: (artists: ArtistInfo[]) => void;
}> = ({ artists, setArtists }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [pageNumber, setPageNumber] = useState(
    page !== null && /\d+/.test(page) ? +page : 1
  );
  const navigate = useNavigate();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { getQuery } = useQueryString();
  const selectedArtistsCount = useAppSelector(
    (state) => state.artists.value
  ).length;

  useEffect(() => {
    loadArtistsData(pageNumber);
  }, [pageNumber]);

  if (error) {
    throw error;
  }

  const loadArtistsData = (page: number) => {
    setLoading(true);
    setError(undefined);
    const searchQuery = getQuery();
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

  const navigateToPage = (pageNumber: number) => {
    navigate(composeNavigateLink(pageNumber, null));
    setPageNumber(pageNumber);
  };

  return (
    <div className="data-container">
      <SearchComponent
        searchArtists={() => {
          navigateToPage(1);
        }}
      />
      <div
        className="cards-container"
        onClick={() => navigate(composeNavigateLink(pageNumber, null))}
      >
        {artists.length > 0
          ? artists.map((item) => (
              <ArtistCard
                key={item.id}
                artist={item}
                navigate={(id: number) =>
                  navigate(composeNavigateLink(pageNumber, id.toString()))
                }
              />
            ))
          : [
              <p key="empty-message">
                No results were found for the provided query.
              </p>,
            ]}
      </div>
      {selectedArtistsCount > 0 ? <SelectionControls /> : undefined}
      <Pagination
        pageNumber={pageNumber}
        pageCount={pageCount}
        navigateToPage={navigateToPage}
      />
      {loading ? <div className="content-blur"></div> : undefined}
    </div>
  );
};
