import type { FC, ReactNode } from 'react';

const Field: FC<{ children: ReactNode, labelText: string, htmlFor: string }> = ({ children, labelText, htmlFor }) => {
  return (
    <div className="w-full flex gap-2.5">
      {labelText !== '' && <label className="w-1/3 text-amber-700 cursor-pointer text-right" htmlFor={htmlFor}>{labelText}</label>}
      {children}
    </div>
  );
};

export default Field;
