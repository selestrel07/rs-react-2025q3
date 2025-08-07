import type { SearchItem, SearchResult } from '../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../types/artist-data.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://api.artic.edu/api/v1/artists/search';
const BASE_ARTIST_URL = 'https://api.artic.edu/api/v1/agents/';
const ENTITY_LIMIT = 8;

type SearchParameters = {
  queryString: string;
  page: number;
};

export const artistsApi = createApi({
  reducerPath: 'artistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/',
  }),
  endpoints: (build) => ({
    searchArtist: build.query<SearchItem[], SearchParameters>({
      query: ({ queryString, page }) =>
        `artists/search/?limit=${ENTITY_LIMIT}&page=${page}&q=${queryString}`,
      transformResponse: (rawResult: SearchResult) => rawResult.data,
    }),
    getArtist: build.query<ArtistInfo, string>({
      query: (id: string) => `agents/${id}`,
      transformResponse: (rawResult: ArtistData) => rawResult.data,
    }),
  }),
});

export const { useSearchArtistQuery, useGetArtistQuery } = artistsApi;

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
