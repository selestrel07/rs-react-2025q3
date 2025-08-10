import { type Context, type FC, useContext } from 'react';
import { NavLink } from 'react-router';
import { ABOUT, MAIN } from '../../../data/path-constants.ts';
import './Header.css';
import {
  ThemeContext,
  type ThemeContextType,
} from '../../../context/ThemeContext.tsx';
import { useAppDispatch } from '../../../hooks/store-hooks.ts';
import { artistsApi } from '../../../services/api.service.ts';

export const Header: FC = () => {
  const { theme, setTheme } = useContext(
    ThemeContext as Context<ThemeContextType>
  );
  const dispatch = useAppDispatch();

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
      <div>
        <button
          onClick={handleClick}
        >{`Change theme to ${theme === 'light' ? 'dark' : 'light'}`}</button>
        <button
          onClick={() =>
            dispatch(artistsApi.util.invalidateTags([{ type: 'Artist' }]))
          }
        >
          Refetch data
        </button>
      </div>
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
