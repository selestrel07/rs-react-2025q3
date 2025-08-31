import { type ChangeEvent, type FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/app-hooks.ts';
import { setFilter } from '../../store/filterSlice.ts';
import Button from '../button/Button.tsx';

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
      <input
        className="border-1 px-0.5 rounded-sm"
        type={'search'}
        value={userInput}
        onChange={handleChange}
      />
      <Button onClick={handleSearch}>Search</Button>
    </>
  );
};

export default SearchBar;
