import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
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

  const yearStatistics: StatisticsByYear[] = useMemo(
    () =>
      statistics
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
        .filter((stats) => stats !== null),
    [statistics, year]
  );

  const filterStatistics = useCallback(
    (statistics: StatisticsByYear[]) => filterByCountry(statistics, filter),
    [statistics, filter]
  );

  const sortStatistics = useCallback(
    (statistics: StatisticsByYear[]) =>
      sortBy(statistics, sorting.field, sorting.order),
    [statistics, sorting]
  );

  const finalStatistics: StatisticsByYear[] = useMemo(
    () => sortStatistics(filterStatistics(yearStatistics)),
    [year, sorting, filter]
  );

  useEffect(() => {
    setStatisticsByYear(finalStatistics);
  }, [finalStatistics]);

  return (
    <div className="overflow-auto w-full h-full scroll-thin">
      <table className="border-collapse min-w-max w-full">
        <Head />
        <tbody>
          {statisticsByYear &&
            statisticsByYear.map((stats) => (
              <Row key={stats.country} statistics={stats} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
