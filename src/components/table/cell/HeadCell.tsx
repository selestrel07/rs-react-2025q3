import type { FC, ReactNode } from 'react';


const HeadCell: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <th className="border border-amber-500 px-0.5 w-20 text-amber-700">
      {children}
    </th>
  );
};

export default HeadCell;