import type { ReactNode } from 'react';
import NavigationLink from './NavigationLink';
import './Header.css';
import ThemeButton from './ThemeButton';
import RevalidateButton from './RevalidateButton';
import { useTranslations } from 'next-intl';
import LanguageButton from './LanguageButton';

export default function Header(): ReactNode {
  const t = useTranslations('Header');
  return (
    <header>
      <div>
        <ThemeButton />
        <RevalidateButton />
        <LanguageButton />
      </div>
      <ul>
        <li>
          <NavigationLink href={`/main/?page=1`}>{t('main')}</NavigationLink>
        </li>
        <li>
          <NavigationLink href={`/about`}>{t('about')}</NavigationLink>
        </li>
      </ul>
    </header>
  );
}
