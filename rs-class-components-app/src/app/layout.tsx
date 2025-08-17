import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
import StoreProvider from './store/StoreProvider';

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
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
