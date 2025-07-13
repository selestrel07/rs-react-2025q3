import type { SearchResult } from '../types/search-item.ts';
import type { ArtistData } from '../types/artist-data.ts';

const BASE_URL =
  'https://api.artic.edu/api/v1/artists/search/?limit=8&offset=0&q=';

export const searchArtists = (queryString?: string): Promise<SearchResult> => {
  return fetch(BASE_URL + queryString).then((response) => response.json());
};

export const loadArtistData = (url: string): Promise<ArtistData> => {
  return fetch(url).then((response) => response.json());
};
