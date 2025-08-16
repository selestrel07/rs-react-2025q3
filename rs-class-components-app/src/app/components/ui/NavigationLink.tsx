'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavigationLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const path = usePathname();

  if (path && href.startsWith(path)) {
    return <span>{children}</span>;
  }

  return <Link href={href}>{children}</Link>;
}
