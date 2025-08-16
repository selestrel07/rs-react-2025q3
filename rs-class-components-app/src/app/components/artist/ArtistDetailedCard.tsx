'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export default function ArtistDetailedCard({
  pageNumber,
  children,
}: {
  pageNumber: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="detailed-card">
      <span
        className="close"
        onClick={() => router.push(`/main/?page=${pageNumber}`)}
      >
        Close
      </span>
      {children}
    </div>
  );
}
