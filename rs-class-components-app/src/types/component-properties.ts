import type { ArtistInfo } from './artist-data.ts';
import type { Dispatch, SetStateAction } from 'react';

export type ArtistCardProperties = {
  artist: ArtistInfo;
};

export type SearchProperties = {
  searchArtists: (searchString: string) => void;
  isLoading: boolean;
};

export type PaginationProperties = {
  pageNumber: number;
  pageCount: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
};
