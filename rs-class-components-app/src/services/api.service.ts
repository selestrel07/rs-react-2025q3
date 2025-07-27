import type { SearchResult } from '../types/search-item.ts';
import type { ArtistData } from '../types/artist-data.ts';

const BASE_URL = 'https://api.artic.edu/api/v1/artists/search';
const BASE_ARTIST_URL = 'https://api.artic.edu/api/v1/agents/';
const ENTITY_LIMIT = 8;

const composeUrl = (pageNumber: number, queryString?: string): URL => {
  const url = new URL(BASE_URL);
  url.searchParams.append('limit', ENTITY_LIMIT.toString());
  url.searchParams.append('page', pageNumber.toString());
  if (queryString) {
    url.searchParams.append('q', queryString);
  }
  return url;
};

export const searchArtists = (queryString?: string): Promise<SearchResult> => {
  return searchArtistsPage(1, queryString);
};

export const searchArtistsPage = (
  pageNumber: number,
  queryString?: string
): Promise<SearchResult> => {
  return fetch(composeUrl(pageNumber, queryString)).then((response) => {
    if (response.status >= 400) throw new Error(response.statusText);
    return response.json();
  });
};

export const loadArtistData = (url: string): Promise<ArtistData> => {
  return fetch(url).then((response) => {
    if (response.status >= 400) throw new Error(response.statusText);
    return response.json();
  });
};

export const loadArtistDataById = (id: string): Promise<ArtistData> => {
  return loadArtistData(`${BASE_ARTIST_URL}${id}`);
};
