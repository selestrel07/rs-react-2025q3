import { type ReactNode, Suspense } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </main>
  );
}
