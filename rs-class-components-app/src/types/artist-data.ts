export type ArtistData = {
  data: ArtistInfo;
};

export type ArtistInfo = {
  birth_date?: number;
  death_date?: number;
  title: string;
  description: string;
  id: number;
  alt_titles?: string[];
};
