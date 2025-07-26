import { type FC, type ReactNode, useEffect, useState } from 'react';
import { SearchComponent } from '../features/search/SearchComponent.tsx';
import { loadArtistData, searchArtists } from '../services/api.service.ts';
import type { SearchItem, SearchResult } from '../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../types/artist-data.ts';
import { ArtistCard } from '../features/artists/ArtistCard.tsx';
import { getSearchString } from '../services/local-storage.service.ts';

export const MainPage: FC = (): ReactNode => {
  const [artists, setArtists] = useState<ArtistInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    loadArtistsData(getSearchString());
  }, []);

  const loadArtistsData = (searchQuery: string) => {
    setLoading(true);
    setError(undefined);
    searchArtists(searchQuery)
      .then(async (result: SearchResult) => {
        const artistsData: ArtistData[] = await Promise.all(
          result.data.map((item: SearchItem) => loadArtistData(item.api_link))
        );
        setArtists(artistsData.map((artistData) => artistData.data));
      })
      .catch((error: Error) => setError(error))
      .finally(() => setLoading(false));
  };

  const simulateError = (): void => {
    setError(new Error('Something went wrong! Manually generated error!'));
  };

  if (error) {
    throw error;
  }

  return (
    <>
      <SearchComponent searchArtists={loadArtistsData} isLoading={loading} />
      <div className="data-container">
        {artists.length > 0
          ? artists.map((item) => <ArtistCard key={item.id} artist={item} />)
          : [
              <p key="empty-message">
                No results were found for the provided query.
              </p>,
            ]}
      </div>
      <button className="error-button" onClick={simulateError}>
        Simulate Error
      </button>
      {loading ? <div className="content-blur"></div> : undefined}
    </>
  );
};
