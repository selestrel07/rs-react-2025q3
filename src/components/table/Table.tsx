import { type FC } from 'react';
import Row from '../row/Row.tsx';
import type { StatisticsWithCountryName } from '../../types/statistics.ts';
import Cell from '../cell/Cell.tsx';

const Table: FC<{ statistics: StatisticsWithCountryName[] }> = ({
  statistics,
}) => {
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
        {statistics.map((statisticsFull) =>
          statisticsFull.data.map((yearFullData) => (
            <Row
              key={`${statisticsFull.iso_code}-${yearFullData.year}`}
              country={statisticsFull.country}
              iso={statisticsFull.iso_code}
              data={yearFullData}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
