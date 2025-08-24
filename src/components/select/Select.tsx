import { type ChangeEvent, type FC, useState } from 'react';

const Select: FC<{ id: string; options: string[] }> = ({ id, options }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative max-h-40 overflow-y-auto">
      <input
        className="pl-1 border-1 border-amber-500 rounded-sm text-amber-700 focus:border-amber-500 focus:outline-amber-500 cursor-pointer"
        list={`${id}-list`}
        value={value}
        onChange={handleChange}
        name={id}
      />
      <datalist id={`${id}-list`}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  );
};

export default Select;
