import type { ReactNode } from 'react';
import NavigationButton from './NavigationButton';
import './Pagination.css';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}): ReactNode {
  return (
    <div className="pagination-wrapper">
      <NavigationButton
        nextPage={currentPage - 1}
        isForward={false}
        isDisabled={currentPage === 1}
      />
      <p>{currentPage}</p>
      <NavigationButton
        nextPage={currentPage + 1}
        isForward={true}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
}
