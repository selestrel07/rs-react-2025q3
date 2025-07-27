import type { FC } from 'react';
import { NavLink } from 'react-router';
import { ABOUT, MAIN } from '../../../data/path-constants.ts';
import './Header.css';

export const Header: FC = () => {
  const style = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#ca2b50' : '#3b6c28',
  });
  return (
    <header>
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
