import { type FC, memo } from 'react';
import { useAppSelector } from '../../hooks/app-hooks.ts';
import type { SortingFields } from '../../types/sorting.ts';

const Sorting: FC<{ field: SortingFields }> = ({ field }) => {
  const sorting = useAppSelector((state) => state.sorting.value);
  return (
    <div className="flex flex-col items-center justify-center gap-0 w-4 h-4">
      <span
        className={`block w-1.5 h-1.5 -rotate-45  ${field === sorting.field && sorting.order === 'ASC' ?
          'border-t-gray-900 border-r-gray-900 border-t-2 border-r-2' : 'border-t-gray-400 border-r-gray-400 border-t-1 border-r-1'}`}
      ></span>
      <span
        className={`block w-1.5 h-1.5 -rotate-45 border-b-1 border-l-1 ${field === sorting.field && sorting.order === 'DESC' ?
          'border-b-gray-900 border-l-gray-900 border-b-2 border-l-2' : 'border-b-gray-400 border-l-gray-400 border-b-1 border-l-1'}`}
      ></span>
    </div>
  );
};

const MemoSorting = memo(Sorting)

export default MemoSorting;
