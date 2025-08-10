import type { ArtistInfo } from '../types/artist-data.ts';

export const ArtistInfoFull: ArtistInfo = {
  title: 'My artist',
  birth_date: 1965,
  death_date: 2015,
  id: 5,
  description: '',
};

export const ArtistInfoEmptyDates: ArtistInfo = {
  title: 'My artist',
  id: 6,
  description: '',
};

export const artistsMockData = [
  {
    data: {
      id: 2,
      title: 'First Artist',
      alt_titles: ['Alternative Second Artist'],
      birth_date: 1959,
      death_date: 2000,
    },
  },
  {
    data: {
      id: 3,
      title: 'Second Artist',
      birth_date: 1859,
      death_date: 1940,
    },
  },
  {
    data: {
      id: 4,
      title: 'Third Artist',
    },
  },
  {
    data: ArtistInfoEmptyDates,
  },
  {
    data: ArtistInfoFull,
  },
];
