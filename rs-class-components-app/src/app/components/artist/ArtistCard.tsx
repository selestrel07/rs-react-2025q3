'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export default function ArtistCard({
  id,
  pageNumber,
  children,
}: {
  id: number;
  pageNumber: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/main/?page=${pageNumber}&artist-id=${id}`)}
    >
      {children}
    </div>
  );
}
