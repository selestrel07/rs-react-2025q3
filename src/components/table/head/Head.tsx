import type { FC } from 'react';
import Cell from '../cell/Cell.tsx';
import Sorting from '../../sorting/Sorting.tsx';
import { useAppDispatch, useAppSelector } from '../../../hooks/app-hooks.ts';
import type { SortingFields } from '../../../types/sorting.ts';
import { setSorting } from '../../../store/sortingSlice.ts';

const Head: FC = () => {
  const sorting = useAppSelector((state) => state.sorting.value);
  const dispatch = useAppDispatch();

  const handleClick = (field: SortingFields): void => {
    console.log('dispatching click action');
    dispatch(setSorting({
      field,
      order: (sorting.field !== field || sorting.order === 'DESC') ? 'ASC' : 'DESC',
    }))
  };

  return (
    <thead className="sticky top-10">
      <tr className="bg-green-100">
        <Cell onClick={() => handleClick('country')} isSortable={true} isHeadCell={true}>
          Country
          <Sorting field="country" />
        </Cell>
        <Cell isHeadCell={true}>ISO</Cell>
        <Cell isHeadCell={true}>Year</Cell>
        <Cell onClick={() => handleClick('population')} isSortable={true} isHeadCell={true}>
          Population
          <Sorting field="population" />
        </Cell>
        <Cell isHeadCell={true}>cement_co2</Cell>
        <Cell isHeadCell={true}>cement_co2_per_capita</Cell>
      </tr>
    </thead>
  );
};

export default Head;
