export type ArtistCardProperties = {
  id: number;
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

export type ArtistDetailedCardProperties = {
  id: string;
};
