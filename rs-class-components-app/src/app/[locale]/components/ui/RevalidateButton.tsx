'use client';

import revalidateAction from '../../actions/revalidate';
import { useTranslations } from 'next-intl';

export default function RevalidateButton() {
  const t = useTranslations('Header');
  return <button onClick={() => revalidateAction()}>{t('refetch')}</button>;
}
