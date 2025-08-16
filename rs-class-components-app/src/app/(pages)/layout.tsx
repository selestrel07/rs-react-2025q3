import type { ReactNode } from 'react';
import { Header } from '../components/ui/Header';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page-wrapper">
      <Header />
      {children}
    </div>
  );
}
