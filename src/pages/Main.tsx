import type { FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { CountryStatistics, StatisticsWithCountryName } from '../types/statistics.ts';
import { loadData } from '../services/api.ts';
import Table from '../components/table/Table.tsx';

const Main: FC = () => {
  const { data } = useSuspenseQuery<CountryStatistics>({
    queryKey: ['data'],
    queryFn: () => loadData(),
  });

  const getFullData = (data: CountryStatistics): StatisticsWithCountryName[] => {
    return Object.entries(data).map(([country, countryData]) => {
      return {
        country: country,
        iso_code: countryData.iso_code,
        data: countryData.data
      }
    });
  };

  return (
    <main>
      <Table statistics={getFullData(data)} />
    </main>
  );
};

export default Main;
