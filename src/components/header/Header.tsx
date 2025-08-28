import type { FC } from 'react';
import type { StatisticsWithCountryName } from '../../types/statistics.ts';
import Select from '../select/Select.tsx';
import SearchBar from '../search/SearchBar.tsx';

const Header: FC<{ data: StatisticsWithCountryName[] }> = ({ data }) => {
  return (
    <header className="flex justify-center gap-2.5 sticky top-0 w-full p-2 box-border bg-blue-50">
      <Select data={data} />
      <SearchBar />
    </header>
  );
};

export default Header;
