import { type FC, useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { StatisticsWithCountryName } from '../types/statistics.ts';
import { loadData } from '../services/api.ts';
import Table from '../components/table/Table.tsx';
import { useAppDispatch } from '../hooks/app-hooks.ts';
import { setYear } from '../store/yearSlice.ts';
import Header from '../components/header/Header.tsx';

const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useSuspenseQuery<StatisticsWithCountryName[]>({
    queryKey: ['data'],
    queryFn: () => loadData(),
  });

  useEffect(() => {
    const yearStatistics = data[0].data;
    dispatch(setYear(yearStatistics[yearStatistics.length - 1].year));
  }, [data]);

  return (
    <>
      <Header data={data}/>
      <main className="p-2.5 w-full h-[calc(100vh-42px)] scroll">
        <Table statistics={data} />
      </main>
    </>
  );
};

export default Main;
