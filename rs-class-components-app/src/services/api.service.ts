import type { SearchResult } from '../types/search-item.ts';
import type { ArtistData, ArtistInfo } from '../types/artist-data.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setPageCount } from '../features/paginaton/paginationSlice.ts';

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
    searchArtist: build.query<SearchResult, SearchParameters>({
      query: ({ queryString, page }) =>
        `artists/search/?limit=${ENTITY_LIMIT}&page=${page}&q=${queryString}`,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPageCount(data.pagination.total_pages));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getArtist: build.query<ArtistInfo, string>({
      query: (id: string) => `agents/${id}`,
      transformResponse: (rawResult: ArtistData) => rawResult.data,
    }),
  }),
});

export const { useSearchArtistQuery, useGetArtistQuery } = artistsApi;
