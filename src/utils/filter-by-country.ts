import type { StatisticsByYear, } from '../types/statistics.ts';

export const filterByCountry = (
  statistics: StatisticsByYear[],
  country: string
): StatisticsByYear[] => {

  return statistics.filter((chunk) =>
    chunk.country.toLowerCase().match(country.toLowerCase())
  );
};
