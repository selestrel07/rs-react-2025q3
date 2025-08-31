import { type FC, memo, type ReactNode, useEffect, useState } from 'react';

const Cell: FC<{
  children: ReactNode;
  isSortable?: boolean;
  onClick?: () => void;
  isHeadCell?: boolean;
}> = ({ children, isSortable, onClick, isHeadCell }) => {
  const [isHighlight, setIsHighlight] = useState(false);

  useEffect(() => {
    if (children !== undefined) {
      setIsHighlight(true);
      const timeout = setTimeout(() => setIsHighlight(false), 800); // blink for 0.8s
      return () => clearTimeout(timeout);
    }
  }, [children]);

  const cellClassName = `border-2 border-solid border-blue-400 px-1 ${isSortable && 'cursor-pointer'}`;
  const childrenWrapper = (
    <div className="inline-flex gap-4 items-center justify-between w-full">
      {children}
    </div>
  );

  if (isHeadCell) {
    return (
      <th onClick={onClick} className={cellClassName}>
        {childrenWrapper}
      </th>
    );
  }

  return (
    <td
      onClick={onClick}
      className={`${cellClassName} transition-colors ease-linear duration-500 ${isHighlight ? ' bg-green-100' : 'bg-transparent'}`}
    >
      {childrenWrapper}
    </td>
  );
};

const MemoCell = memo(Cell);

export default MemoCell;
