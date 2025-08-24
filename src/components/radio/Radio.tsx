import { type FC, Fragment, useState } from 'react';

const Radio: FC<{
  options: string[];
  name: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}> = ({ options, name, value, onChange }) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(options[0]);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolledValue;

  const handleChange = (val: string) => {
    if (isControlled) {
      onChange?.(val);
    } else {
      setUncontrolledValue(val);
      onChange?.(val);
    }
  };
  return (
    <>
      {options.map((option) => (
        <Fragment key={option}>
          <label
            className="text-amber-700 cursor-pointer"
            htmlFor={option}
          >{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}</label>
          <div className="grid place-items-center">
            <input
              className="peer col-start-1 row-start-1 self-center appearance-none cursor-pointer border-2 w-4 h-4 rounded-full p-0.5
             border-amber-500 focus:outline focus:outline-amber-500"
              type="radio"
              id={option}
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={() => handleChange(option)}
            />
            <div className="pointer-events-none col-start-1 row-start-1 w-2 h-2 rounded-full peer-checked:bg-amber-400"></div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default Radio;
