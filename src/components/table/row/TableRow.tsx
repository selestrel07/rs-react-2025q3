import type { FC } from 'react';
import type { Person } from '../../../interfaces/person/person.ts';
import Cell from '../cell/Cell.tsx';


const TableRow: FC<{ data: Person }> = ({ data }) => {
  return (
    <tr>
      <Cell>
        <img className="max-w-40 max-h-20 mx-auto" src={data.picture} alt="Person's image" />
      </Cell>
      <Cell>{data.name}</Cell>
      <Cell>{data.age}</Cell>
      <Cell>{data.gender}</Cell>
      <Cell>{data.email}</Cell>
      <Cell>{data.country}</Cell>
    </tr>
  );
};

export default TableRow;