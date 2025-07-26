import type { ArtistInfo } from './artist-data.ts';

export type ArtistCardProperties = {
  artist: ArtistInfo;
};

export type SearchProperties = {
  searchArtists: (searchString: string) => void;
  isLoading: boolean;
};
