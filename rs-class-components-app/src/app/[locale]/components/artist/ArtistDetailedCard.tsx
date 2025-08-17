'use client';

import type { ReactNode } from 'react';
import { useRouter } from '../../../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ArtistDetailedCard({
  pageNumber,
  children,
}: {
  pageNumber: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const t = useTranslations('MainPage');
  return (
    <div className="detailed-card">
      <span
        className="close"
        onClick={() => router.push(`/main/?page=${pageNumber}`)}
      >
        {t('close')}
      </span>
      {children}
    </div>
  );
}
