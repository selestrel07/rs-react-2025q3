import { type FC, type ReactNode } from 'react';
import './Pagination.css';
import type { PaginationProperties } from '../../types/component-properties.ts';
import { useAppSelector } from '../../hooks/store-hooks.ts';

export const Pagination: FC<PaginationProperties> = (
  properties: PaginationProperties
): ReactNode => {
  const pageCount = useAppSelector((state) => state.pagination.value);
  if (properties.pageNumber < 1) {
    properties.navigateToPage(1);
  }

  return (
    <div className="pagination-wrapper">
      <button
        className="button-pagination"
        onClick={() =>
          properties.navigateToPage(
            properties.pageNumber > pageCount + 1
              ? pageCount
              : properties.pageNumber - 1
          )
        }
        disabled={properties.pageNumber === 1}
      >
        {'<'}
      </button>
      <div className="page-number">{properties.pageNumber}</div>
      <button
        className="button-pagination"
        onClick={() => properties.navigateToPage(properties.pageNumber + 1)}
        disabled={properties.pageNumber >= pageCount}
      >
        {'>'}
      </button>
    </div>
  );
};
