import type { FC } from 'react';
import type {
  StatisticsByYear,
} from '../../types/statistics.ts';
import Cell from '../cell/Cell.tsx';

const Row: FC<{statistics: StatisticsByYear}> = ({statistics}) => {
  return <tr>
    <Cell>{statistics.country ?? 'N/A'}</Cell>
    <Cell>{statistics.iso_code ?? 'N/A'}</Cell>
    <Cell>{statistics.year}</Cell>
    <Cell>{statistics.population ?? 'N/A'}</Cell>
    <Cell>{statistics.cement_co2 ?? 'N/A'}</Cell>
    <Cell>{statistics.cement_co2_per_capita ?? 'N/A'}</Cell>
  </tr>
}

export default Row;