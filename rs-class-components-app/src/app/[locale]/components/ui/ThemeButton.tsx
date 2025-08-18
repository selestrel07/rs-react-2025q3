'use client';

import type { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setTheme } from '../../store/themeSlice';
import { useTranslations } from 'next-intl';

export default function ThemeButton(): ReactNode {
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();
  const t = useTranslations('Header');
  const newTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button onClick={() => dispatch(setTheme(newTheme))}>
      {t(`theme-${theme}`)}
    </button>
  );
}
