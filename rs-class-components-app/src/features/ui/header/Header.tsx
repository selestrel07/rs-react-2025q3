import { type Context, type FC, useContext } from 'react';
import { NavLink } from 'react-router';
import { ABOUT, MAIN } from '../../../data/path-constants.ts';
import './Header.css';
import {
  ThemeContext,
  type ThemeContextType,
} from '../../../context/ThemeContext.tsx';

export const Header: FC = () => {
  const { theme, setTheme } = useContext(
    ThemeContext as Context<ThemeContextType>
  );

  const getActiveColor = () => (theme === 'light' ? '#ca2b50' : '#f8e8e9');

  const getDefaultColor = () => (theme === 'light' ? '#3b6c28' : '#4be42e');

  const style = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? getActiveColor() : getDefaultColor(),
  });

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header>
      <button
        onClick={handleClick}
      >{`Change theme to ${theme === 'light' ? 'dark' : 'light'}`}</button>
      <ul>
        <li>
          <NavLink style={style} to={`${MAIN}/?page=1`}>
            Main
          </NavLink>
        </li>
        <li>
          <NavLink style={style} to={ABOUT}>
            About
          </NavLink>
        </li>
      </ul>
    </header>
  );
};
