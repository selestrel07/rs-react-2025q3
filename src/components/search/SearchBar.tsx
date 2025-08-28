import { type ChangeEvent, type FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/app-hooks.ts';
import { setFilter } from '../../store/filterSlice.ts';

const SearchBar: FC = () => {
  const searchValue = useAppSelector((state) => state.filter.value);
  const [userInput, setUserInput] = useState(searchValue);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setFilter(userInput));
  };

  return (
    <>
      <input className="border-1 px-0.5 rounded-sm" type={'search'} value={userInput} onChange={handleChange} />
      <button className="border-1 px-2.5 rounded-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5" onClick={handleSearch}>Search</button>
    </>
  );
};

export default SearchBar;
