import { type FC, type ReactNode } from 'react';
import './Pagination.css';
import type { PaginationProperties } from '../../types/component-properties.ts';

export const Pagination: FC<PaginationProperties> = (
  properties: PaginationProperties
): ReactNode => {
  return (
    <div className="pagination-wrapper">
      <button
        className="button-pagination"
        onClick={() => properties.setPageNumber((p) => p - 1)}
        disabled={properties.pageNumber === 1}
      >
        {'<'}
      </button>
      <div className="page-number">{properties.pageNumber}</div>
      <button
        className="button-pagination"
        onClick={() => properties.setPageNumber((p) => p + 1)}
        disabled={properties.pageNumber >= properties.pageCount}
      >
        {'>'}
      </button>
    </div>
  );
};
