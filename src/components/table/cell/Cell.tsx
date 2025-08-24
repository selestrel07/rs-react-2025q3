import type { FC, ReactNode } from 'react';

const Cell: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <td className="border border-amber-500 px-0.5 w-20 text-amber-700">
      {children}
    </td>
  );
};

export default Cell;
