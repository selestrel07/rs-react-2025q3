import { type FC, useContext, type Context } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../features/ui/header/Header.tsx';
import {
  ThemeContext,
  type ThemeContextType,
} from '../context/ThemeContext.tsx';

export const Page: FC = () => {
  const { theme } = useContext(ThemeContext as Context<ThemeContextType>);
  return (
    <div className={`view theme-${theme}`}>
      <div className="page-wrapper">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
