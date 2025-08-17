import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
import StoreProvider from './store/StoreProvider';
import Header from './components/ui/Header';
import PageWrapper from './(pages)/PageWrapper';

export const metadata: Metadata = {
  title: 'React App (Next.js)',
  description:
    'React App (Next.js) is an application developed in scope of RS School 2025 Q3 React Course',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <StoreProvider>
            <PageWrapper>
              <div className="page-wrapper">
                <Header />
                {children}
              </div>
            </PageWrapper>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
