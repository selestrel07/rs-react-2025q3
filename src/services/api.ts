import type {
  CountryStatistics,
  StatisticsWithCountryName,
} from '../types/statistics.ts';

const getFullData = (data: CountryStatistics): StatisticsWithCountryName[] => {
  return Object.entries(data).map(([country, countryData]) => {
    return {
      country: country,
      iso_code: countryData.iso_code,
      data: countryData.data
    }
  });
};

export const loadData = async (): Promise<StatisticsWithCountryName[]> => {
  const res = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );

  const json = await res.json();

  return getFullData(json);
};
