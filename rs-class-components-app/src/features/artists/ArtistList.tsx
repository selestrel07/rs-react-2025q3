import { type FC, useState } from 'react';
import { SearchComponent } from '../search/SearchComponent.tsx';
import { Pagination } from '../paginaton/Pagination.tsx';
import { useNavigate, useSearchParams } from 'react-router';
import { ArtistCard } from './ArtistCard.tsx';
import { useSearchArtistQuery } from '../../services/api.service.ts';
import { MAIN } from '../../data/path-constants.ts';
import { useQueryString } from '../../hooks/UseQueryString.tsx';
import { SelectionControls } from './SelectionControls.tsx';
import { useAppSelector } from '../../hooks/store-hooks.ts';
import { DataLoadError } from '../ui/data-load-error/DataLoadError.tsx';

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
  const { getQuery } = useQueryString();
  const selectedArtistsCount = useAppSelector(
    (state) => state.artists.value
  ).length;
  const { data, error, isLoading, isFetching } = useSearchArtistQuery({
    queryString: getQuery(),
    page: pageNumber,
  });

  const navigateToPage = (pageNumber: number) => {
    navigate(composeNavigateLink(pageNumber, null));
    setPageNumber(pageNumber);
  };

  return (
    <div className="data-container">
      <SearchComponent navigateToPage={() => navigateToPage(1)} />
      <div
        className="cards-container"
        onClick={() => navigate(composeNavigateLink(pageNumber, null))}
      >
        {isLoading || isFetching ? (
          <p>Loading...</p>
        ) : error ? (
          <DataLoadError error={error} />
        ) : data !== undefined && data.data.length > 0 ? (
          data.data.map((item) => (
            <ArtistCard
              key={item.id}
              id={item.id}
              navigate={(id: number) =>
                navigate(composeNavigateLink(pageNumber, id.toString()))
              }
            />
          ))
        ) : (
          [
            <p key="empty-message">
              No results were found for the provided query.
            </p>,
          ]
        )}
      </div>
      {selectedArtistsCount > 0 ? <SelectionControls /> : undefined}
      <Pagination pageNumber={pageNumber} navigateToPage={navigateToPage} />
      {isLoading || isFetching ? (
        <div className="content-blur"></div>
      ) : undefined}
    </div>
  );
};
