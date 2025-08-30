import type { FC } from 'react';
import type {
  StatisticsByYear,
} from '../../../types/statistics.ts';
import Cell from '../cell/Cell.tsx';
import { useAppSelector } from '../../../hooks/app-hooks.ts';

const Row: FC<{statistics: StatisticsByYear}> = ({statistics}) => {
  const optionalFields = useAppSelector((state) => state.optionalFields.value);
  return <tr>
    <Cell>{statistics.country ?? 'N/A'}</Cell>
    <Cell>{statistics.iso_code ?? 'N/A'}</Cell>
    <Cell>{statistics.year}</Cell>
    <Cell>{statistics.population ?? 'N/A'}</Cell>
    <Cell>{statistics.cement_co2 ?? 'N/A'}</Cell>
    <Cell>{statistics.cement_co2_per_capita ?? 'N/A'}</Cell>
    {optionalFields.map((field) => (
      <Cell key={field}>{
        Object.keys(statistics).includes(field) ?
        statistics[`${field}`] : 'N/A'
      }
      </Cell>
    ))}
  </tr>
}

export default Row;