import { type FC, type ReactNode, useEffect, useState } from 'react';
import type { ArtistInfo } from '../../types/artist-data.ts';
import { loadArtistDataById } from '../../services/api.service.ts';
import { Link, useSearchParams } from 'react-router';
import { MAIN } from '../../data/path-constants.ts';
import './ArtistDetailedCard.css';

type ArtistDetailedCardProperties = {
  id: string;
};

export const ArtistDetailedCard: FC<ArtistDetailedCardProperties> = ({
  id,
}): ReactNode => {
  const [artistData, setArtistData] = useState<ArtistInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('page') ?? '1';

  useEffect(() => {
    if (id !== '-1') {
      setLoading(true);
      loadArtistDataById(id)
        .then((data) => setArtistData(data.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="detailed-card">Loading...</div>;
  }

  return (
    <div className="detailed-card">
      <Link to={`${MAIN}?page=${pageNumber}`}>Close</Link>
      {artistData === null ? (
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
