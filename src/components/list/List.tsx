import type { FC } from 'react';
import { useAppSelector } from '../../hooks/store-hooks.ts';
import HeadCell from '../table/cell/HeadCell.tsx';
import TableRow from '../table/row/TableRow.tsx';

const List: FC = () => {
  const people = useAppSelector((state) => state.people.value);
  return (
    <table className="mx-auto mt-1 border-collapse">
      <thead>
        <tr>
          <HeadCell>Picture</HeadCell>
          <HeadCell>Name</HeadCell>
          <HeadCell>Age</HeadCell>
          <HeadCell>Gender</HeadCell>
          <HeadCell>Email</HeadCell>
          <HeadCell>Country</HeadCell>
        </tr>
      </thead>
      <tbody>
        {people.map((person, i) => (
          <TableRow key={i} data={person} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
