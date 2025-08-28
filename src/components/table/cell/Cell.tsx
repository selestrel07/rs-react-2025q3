import type { FC, ReactNode } from 'react';

const Cell: FC<{
  children: ReactNode;
  isSortable?: boolean;
  onClick?: () => void;
  isHeadCell?: boolean;
}> = ({ children, isSortable, onClick, isHeadCell }) => {
  const cellClassName = `border-2 border-solid border-blue-400 px-1 ${isSortable && 'cursor-pointer'}`;
  const childrenWrapper = (
    <div className="inline-flex gap-4 items-center justify-between w-full">
      {children}
    </div>
  );

  if (isHeadCell) {
    return (
      <th
        onClick={onClick}
        className={cellClassName}
      >
        {childrenWrapper}
      </th>
    );
  }

  return (
    <td
      onClick={onClick}
      className={cellClassName}
    >
      {childrenWrapper}
    </td>
  );
};

export default Cell;
