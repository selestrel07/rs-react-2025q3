import { type FC, useState } from 'react';
import { SearchComponent } from '../search/SearchComponent.tsx';
import { Pagination } from '../paginaton/Pagination.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { ArtistCard } from './ArtistCard.tsx';
import {
  searchArtistsPage,
  useSearchArtistQuery,
} from '../../services/api.service.ts';
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

export const ArtistList: FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [pageNumber, setPageNumber] = useState(
    page !== null && /\d+/.test(page) ? +page : 1
  );
  const navigate = useNavigate();
  const [error, setError] = useState<Error | undefined>(undefined);
  const { getQuery } = useQueryString();
  const selectedArtistsCount = useAppSelector(
    (state) => state.artists.value
  ).length;
  const { data, isLoading } = useSearchArtistQuery({
    queryString: getQuery(),
    page: pageNumber,
  });

  if (error) {
    throw error;
  }

  const loadArtistsData = (page: number, query?: string) => {
    setError(undefined);
    const searchQuery = query === undefined ? getQuery() : query;
    searchArtistsPage(page, searchQuery).catch(setError);
  };

  const navigateToPage = (pageNumber: number) => {
    navigate(composeNavigateLink(pageNumber, null));
    setPageNumber(pageNumber);
  };

  if (data === undefined) {
    return (
      <div className="data-container">
        Something went wrong! Please reload page and start again.
      </div>
    );
  }

  return (
    <div className="data-container">
      <SearchComponent
        searchArtists={(query: string): void => {
          navigateToPage(1);
          loadArtistsData(1, query);
        }}
      />
      <div
        className="cards-container"
        onClick={() => navigate(composeNavigateLink(pageNumber, null))}
      >
        {data.data.length > 0
          ? data.data.map((item) => (
              <ArtistCard
                key={item.id}
                id={item.id}
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
      <Pagination pageNumber={pageNumber} navigateToPage={navigateToPage} />
      {isLoading ? <div className="content-blur"></div> : undefined}
    </div>
  );
};
