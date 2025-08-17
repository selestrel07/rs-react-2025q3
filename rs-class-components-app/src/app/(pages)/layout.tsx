import type { ReactNode } from 'react';
import Header from '../components/ui/Header';
import PageWrapper from './PageWrapper';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <div className="page-wrapper">
        <Header />
        {children}
      </div>
    </PageWrapper>
  );
}
