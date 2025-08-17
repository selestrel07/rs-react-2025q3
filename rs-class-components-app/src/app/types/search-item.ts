export type SearchResult = {
  data: SearchItem[];
  pagination: PaginationData;
};

export type SearchItem = {
  id: number;
  api_link: string;
};

export type PaginationData = {
  total_pages: number;
};
