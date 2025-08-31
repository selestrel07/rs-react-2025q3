import { type FC, useState } from 'react';
import type { StatisticsWithCountryName } from '../../types/statistics.ts';
import Select from '../select/Select.tsx';
import SearchBar from '../search/SearchBar.tsx';
import Modal from '../modal/Modal.tsx';
import Button from '../button/Button.tsx';

const Header: FC<{ data: StatisticsWithCountryName[] }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="flex justify-center gap-2.5 sticky top-0 w-full p-2 box-border bg-blue-50">
      <Button onClick={() => setIsOpen(true)}>Configure fields</Button>
      <Select data={data} />
      <SearchBar />
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}/>
    </header>
  );
};

export default Header;
