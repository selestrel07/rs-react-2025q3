import type { ArtistInfo } from './artist-data.ts';

export type ArtistCardProperties = {
  artist: ArtistInfo;
  navigate: (id: number) => void | Promise<void>;
};

export type SearchProperties = {
  searchArtists: (searchString: string) => void;
};

export type PaginationProperties = {
  pageNumber: number;
  pageCount: number;
  navigateToPage: (pageNumber: number) => void;
};
