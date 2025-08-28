import { type FC, useEffect, useState } from 'react';
import Row from './row/Row.tsx';
import type {
  StatisticsByYear,
  StatisticsWithCountryName,
} from '../../types/statistics.ts';
import { useAppSelector } from '../../hooks/app-hooks.ts';
import { sortBy } from '../../utils/sort-object-array-by.ts';
import Head from './head/Head.tsx';
import { filterByCountry } from '../../utils/filter-by-country.ts';

const Table: FC<{ statistics: StatisticsWithCountryName[] }> = ({
  statistics,
}) => {
  const year = useAppSelector((state) => state.year.value);
  const sorting = useAppSelector((state) => state.sorting.value);
  const filter = useAppSelector((state) => state.filter.value);
  const [statisticsByYear, setStatisticsByYear] = useState<
    StatisticsByYear[] | undefined
  >(undefined);

  const filterStatistics = (statistics: StatisticsByYear[]) => {
    return filterByCountry(statistics, filter);
  };

  const sortStatistics = (statistics: StatisticsByYear[]) => {
    return sortBy(statistics, sorting.field, sorting.order);
  };

  useEffect(() => {
    const yearStatistics: StatisticsByYear[] = statistics
      .map((fullStatistics) => {
        const yearStatistics = fullStatistics.data.find(
          (yearStatistics) => yearStatistics.year === year
        );
        if (!yearStatistics) return null;
        return {
          country: fullStatistics.country,
          iso_code: fullStatistics.iso_code,
          ...yearStatistics,
        };
      })
      .filter((stats) => stats !== null);

    if (filter.length > 0) {
      setStatisticsByYear(sortStatistics(filterStatistics(yearStatistics)));
    } else {
      setStatisticsByYear(sortStatistics(yearStatistics))
    }
  }, [year, sorting, filter]);

  return (
    <table className="border-collapse">
      <Head />
      <tbody>
        {statisticsByYear &&
          statisticsByYear.map((stats) => (
            <Row key={stats.country} statistics={stats} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
