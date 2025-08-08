import { type FC, type ReactNode } from 'react';
import {
  useGetArtistQuery,
  useSearchArtistQuery,
} from '../../services/api.service.ts';
import { Link, useSearchParams } from 'react-router';
import { MAIN } from '../../data/path-constants.ts';
import type { ArtistDetailedCardProperties } from '../../types/component-properties.ts';
import './ArtistDetailedCard.css';
import { useQueryString } from '../../hooks/UseQueryString.tsx';
import { DataLoadError } from '../ui/data-load-error/DataLoadError.tsx';

export const ArtistDetailedCard: FC<ArtistDetailedCardProperties> = ({
  id,
}): ReactNode => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('page') ?? '1';
  const { getQuery } = useQueryString();
  const { data: artistData, error, isLoading } = useGetArtistQuery(id);
  const { data: searchData } = useSearchArtistQuery({
    queryString: getQuery(),
    page: +pageNumber,
  });

  if (isLoading) {
    return <div className="detailed-card">Loading...</div>;
  }

  return (
    <div className="detailed-card">
      <Link to={`${MAIN}?page=${pageNumber}`}>Close</Link>
      {error ? (
        <DataLoadError error={error} />
      ) : artistData === null ||
        artistData === undefined ||
        !searchData?.data.map((item) => item.id).includes(+id) ? (
        <p>
          No artist was found by provided id on the page. Please check your
          information and try again
        </p>
      ) : (
        <div className="artist-info">
          <p>
            <span>
              <b>Title: </b>
            </span>
            <span>{artistData.title}</span>
          </p>
          <p>
            <span>
              <b>Alternative titles: </b>
            </span>
            <span>
              {artistData.alt_titles
                ? artistData.alt_titles.join(', ')
                : 'No Alternative titles'}
            </span>
          </p>
          <p>
            <span>
              <b>Birth Date: </b>
            </span>
            <span>{artistData.birth_date ?? 'Unknown'}</span>
          </p>
          <p>
            <span>
              <b>Date of Death: </b>
            </span>
            <span>{artistData.death_date ?? 'Unknown'}</span>
          </p>
        </div>
      )}
    </div>
  );
};
