import { type ChangeEvent, type FC, useState } from 'react';

const Select: FC<{
  id: string;
  options: string[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}> = ({ id, options, error, value, onChange }) => {
  const [uncontrolledValue, setUncontrolledValue] = useState('');

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isControlled) {
      onChange?.(val);
    } else {
      setUncontrolledValue(val);
      onChange?.(val);
    }
  };

  return (
    <div>
      <input
        className={`pl-1 border-1 ${error && error.length > 0 ? 'border-red-900 bg-red-200' : 'border-amber-500'} rounded-sm text-amber-700 focus:border-amber-500 focus:outline-amber-500 cursor-pointer`}
        list={`${id}-list`}
        value={selectedValue}
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
