import { type FC, type ReactNode, useEffect, useState } from 'react';
import { SearchComponent } from '../../features/search/SearchComponent.tsx';
import {
  loadArtistData,
  searchArtistsPage,
} from '../../services/api.service.ts';
import type { SearchItem, SearchResult } from '../../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../../types/artist-data.ts';
import { ArtistCard } from '../../features/artists/ArtistCard.tsx';
import { Pagination } from '../../features/paginaton/Pagination.tsx';
import './Main.css';
import { ArtistDetailedCard } from '../../features/artists/ArtistDetailedCard.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { MAIN } from '../../data/path-constants.ts';
import { useQueryString } from '../../hooks/UseQueryString.tsx';

const composeNavigateLink = (
  pageNumber: number,
  artistId: string | null
): string => {
  return `${MAIN}/?page=${pageNumber}${artistId ? `&artist-id=${artistId}` : ''}`;
};

export const MainPage: FC = (): ReactNode => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');
  const artistId = searchParams.get('artist-id');
  const [artists, setArtists] = useState<ArtistInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(
    page !== null && /\d+/.test(page) ? +page : 1
  );
  const [pageCount, setPageCount] = useState(1);
  const { getQuery } = useQueryString();

  useEffect(() => {
    navigate(composeNavigateLink(pageNumber, null));
    loadArtistsData(pageNumber, getQuery());
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

  const navigateToFirstPage = () => {
    const pageNumber = 1;
    navigate(composeNavigateLink(pageNumber, null));
    setPageNumber(pageNumber);
  };

  if (error) {
    throw error;
  }

  return (
    <>
      <main>
        <div className="data-container">
          <SearchComponent
            searchArtists={(qs: string) => {
              navigateToFirstPage();
              loadArtistsData(pageNumber, qs);
            }}
            isLoading={loading}
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
          <Pagination
            pageNumber={pageNumber}
            pageCount={pageCount}
            setPageNumber={setPageNumber}
          />
        </div>
        {artistId !== null ? (
          <ArtistDetailedCard
            id={
              artists.map((artist) => artist.id).includes(+artistId)
                ? artistId
                : '-1'
            }
            page={pageNumber}
          />
        ) : undefined}
      </main>
      {loading ? <div className="content-blur"></div> : undefined}
    </>
  );
};
