import type { ChangeEvent, FC } from 'react';
import type { StatisticsWithCountryName } from '../../types/statistics.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/app-hooks.ts';
import { setYear } from '../../store/yearSlice.ts';

const Select: FC<{ data: StatisticsWithCountryName[] }> = ({ data }) => {
  const year = useAppSelector((state) => state.year.value);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setYear(+e.target.value));
  };

  return (
    <>
      <label htmlFor="year">Select year: </label>
      <select
        id="year"
        className="border-1 border-b-gray-400"
        value={year}
        onChange={handleChange}
      >
        {data[0].data.map((yearData) => (
          <option key={yearData.year} value={yearData.year}>
            {yearData.year}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
