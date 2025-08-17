import type { ReactNode } from 'react';
import NavigationLink from './NavigationLink';
import './Header.css';
import ThemeButton from './ThemeButton';
import RevalidateButton from './RevalidateButton';

export default function Header(): ReactNode {
  return (
    <header>
      <div>
        <ThemeButton />
        <RevalidateButton />
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
