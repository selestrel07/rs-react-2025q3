import type { FC } from 'react';

const Input: FC<{
  id: string;
  type: string;
  name: string;
  error: string;
  defaultChecked?: boolean;
  alignRight?: boolean;
}> = ({ id, type, name, error, defaultChecked, alignRight }) => {
  return (
    <div>
      <input
        className={`border-1 ${type !== 'file' && 'px-1'} ${error.length > 0 ? 'border-red-900 bg-red-200' : 'border-amber-500'} rounded-sm text-amber-700 
      focus:outline-amber-500 focus:outline ${alignRight && 'text-right'} ${
          ['radio', 'checkbox', 'file'].includes(type) && 'cursor-pointer'
        } placeholder-amber-50 ${type === 'file' && 'file:cursor-pointer file:bg-amber-200 file:px-0.5'}`}
        id={id}
        type={type}
        name={name}
        defaultChecked={defaultChecked}
        autoComplete="off"
      />
      <p className="h-4 text-red-500 text-xs pt-1">{error}</p>
    </div>
  );
};

export default Input;
