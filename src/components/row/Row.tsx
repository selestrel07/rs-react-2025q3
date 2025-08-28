import type { FC } from 'react';
import type { YearStatistics } from '../../types/statistics.ts';
import Cell from '../cell/Cell.tsx';

const Row: FC<{country: string; iso: string; data: YearStatistics}> = ({country, iso, data}) => {
  return <tr>
    <Cell>{country ?? 'N/A'}</Cell>
    <Cell>{iso}</Cell>
    <Cell>{data.year}</Cell>
    <Cell>{data.population ?? 'N/A'}</Cell>
    <Cell>{data.cement_co2 ?? 'N/A'}</Cell>
    <Cell>{data.cement_co2_per_capita ?? 'N/A'}</Cell>
  </tr>
}

export default Row;