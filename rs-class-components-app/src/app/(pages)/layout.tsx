import type { ReactNode } from 'react';
import { Header } from '../components/ui/Header';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
