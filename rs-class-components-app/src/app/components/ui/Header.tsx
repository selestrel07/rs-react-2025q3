import type { ReactNode } from 'react';
import NavigationLink from './NavigationLink';
import './Header.css';
import ThemeButton from './ThemeButton';

export default function Header(): ReactNode {
  return (
    <header>
      <div>
        <ThemeButton />
      </div>
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
}
