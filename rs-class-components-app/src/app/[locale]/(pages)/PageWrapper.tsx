'use client';

import type { ReactNode } from 'react';
import { useAppSelector } from '../hooks/store-hooks';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const theme = useAppSelector((state) => state.theme.value);
  return <div className={`view ${theme}`}>{children}</div>;
}
