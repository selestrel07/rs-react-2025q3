import type { CountryStatistics } from '../types/statistics.ts';

export const loadData = async (): Promise<CountryStatistics> => {
  const res = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  return await res.json();
};
