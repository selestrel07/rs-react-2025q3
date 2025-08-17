'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '../../../../i18n/navigation';

export default function NavigationLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const path = usePathname();

  if (path && href.startsWith('/' + path.split('/')[2])) {
    return <span>{children}</span>;
  }

  return <Link href={href}>{children}</Link>;
}
