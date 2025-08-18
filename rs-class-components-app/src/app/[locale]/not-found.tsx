import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');
  return (
    <div className="not-found-container">
      <p>{t('text')}</p>
    </div>
  );
}
