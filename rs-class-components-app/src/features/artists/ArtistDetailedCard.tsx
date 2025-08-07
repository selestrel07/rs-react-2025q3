import { type FC, type ReactNode } from 'react';
import { useGetArtistQuery } from '../../services/api.service.ts';
import { Link, useSearchParams } from 'react-router';
import { MAIN } from '../../data/path-constants.ts';
import type { ArtistDetailedCardProperties } from '../../types/component-properties.ts';
import './ArtistDetailedCard.css';

export const ArtistDetailedCard: FC<ArtistDetailedCardProperties> = ({
  id,
}): ReactNode => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('page') ?? '1';
  const { data, isLoading } = useGetArtistQuery(id);

  if (isLoading) {
    return <div className="detailed-card">Loading...</div>;
  }

  return (
    <div className="detailed-card">
      <Link to={`${MAIN}?page=${pageNumber}`}>Close</Link>
      {data === null || data === undefined ? (
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
            <span>{data.title}</span>
          </p>
          <p>
            <span>
              <b>Alternative titles: </b>
            </span>
            <span>
              {data.alt_titles
                ? data.alt_titles.join(', ')
                : 'No Alternative titles'}
            </span>
          </p>
          <p>
            <span>
              <b>Birth Date: </b>
            </span>
            <span>{data.birth_date ?? 'Unknown'}</span>
          </p>
          <p>
            <span>
              <b>Date of Death: </b>
            </span>
            <span>{data.death_date ?? 'Unknown'}</span>
          </p>
        </div>
      )}
    </div>
  );
};
