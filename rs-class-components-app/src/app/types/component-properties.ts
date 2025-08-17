export type ArtistCardProperties = {
  id: number;
  navigate: (id: number) => void | Promise<void>;
};

export type SearchProperties = {
  navigateToPage: () => void;
};

export type PaginationProperties = {
  pageNumber: number;
  navigateToPage: (pageNumber: number) => void;
};

export type ArtistDetailedCardProperties = {
  id: string;
};
