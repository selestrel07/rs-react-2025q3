import type { FC, ReactNode } from 'react';

const Cell: FC<{children: ReactNode}> = ({children}) => {
  return <td className="border-2 border-solid border-blue-400 px-1">{children}</td>
}

export default Cell;