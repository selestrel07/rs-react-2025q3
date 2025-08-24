import { type ChangeEvent, type FC, useState } from 'react';

const Select: FC<{ id: string; options: string[]; error: string }> = ({
  id,
  options,
  error,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        className={`pl-1 border-1 ${error.length > 0 ? 'border-red-900 bg-red-200' : 'border-amber-500'} rounded-sm text-amber-700 focus:border-amber-500 focus:outline-amber-500 cursor-pointer`}
        list={`${id}-list`}
        value={value}
        onChange={handleChange}
        name={id}
        id={id}
      />
      <p className="h-4 text-red-500 text-xs pt-1">{error}</p>
      <datalist id={`${id}-list`}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};

export default Select;
