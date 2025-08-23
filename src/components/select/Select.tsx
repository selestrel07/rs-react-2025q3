import type { FC } from 'react';

const Select: FC<{ id: string; options: string[] }> = ({ id, options }) => {
  return (
    <select
      className="pl-1 border-1 border-amber-500 rounded-sm text-amber-700 focus:border-amber-500 focus:outline-amber-500 cursor-pointer"
      id={id}
      name={id}
      autoComplete="on"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
