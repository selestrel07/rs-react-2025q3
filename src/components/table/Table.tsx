import { type FC, useEffect, useState } from 'react';
import Row from '../row/Row.tsx';
import type {
  StatisticsByYear,
  StatisticsWithCountryName,
} from '../../types/statistics.ts';
import Cell from '../cell/Cell.tsx';
import { useAppSelector } from '../../hooks/app-hooks.ts';

const Table: FC<{ statistics: StatisticsWithCountryName[] }> = ({
  statistics,
}) => {
  const year = useAppSelector((state) => state.year.value);
  const [statisticsByYear, setStatisticsByYear] = useState<
    StatisticsByYear[] | null
  >(null);

  useEffect(() => {
    setStatisticsByYear(
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
        .filter((stats) => stats !== null)
    );
  }, [year]);

  return (
    <table className="border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <Cell>Country</Cell>
          <Cell>ISO</Cell>
          <Cell>Year</Cell>
          <Cell>Population</Cell>
          <Cell>cement_co2</Cell>
          <Cell>cement_co2_per_capita</Cell>
        </tr>
      </thead>
      <tbody>
        {statisticsByYear &&
          statisticsByYear.map((stats) => <Row statistics={stats} />)}
      </tbody>
    </table>
  );
};

export default Table;
