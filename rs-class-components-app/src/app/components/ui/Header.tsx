import { type FC } from 'react';
import NavigationLink from './NavigationLink';
import './Header.css';

export const Header: FC = () => {
  return (
    <header>
      <ul>
        <li>
          <NavigationLink href={`/main/?page=1`}>Main</NavigationLink>
        </li>
        <li>
          <NavigationLink href={`/about`}>About</NavigationLink>
        </li>
      </ul>
    </header>
  );
};
