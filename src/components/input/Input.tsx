import type { FC } from 'react';

const Input: FC<{ id: string; type: string; name: string; defaultChecked?: boolean, alignRight?: boolean }> = ({
  id,
  type,
  name,
  defaultChecked,
  alignRight
}) => {
  return (
    <input
      className={`border-1 border-amber-500 rounded-sm text-amber-700 focus:outline-amber-500 focus:outline ${alignRight && 'text-right'} ${['radio', 'checkbox', 'file']
        .includes(type) && 'cursor-pointer'} placeholder-amber-50 ${type === 'file' && 'file:cursor-pointer file:bg-amber-200 file:px-0.5'}`}
      id={id}
      type={type}
      name={name}
      defaultChecked={defaultChecked}
      autoComplete="off"
    />
  );
};

export default Input;
