import type { ReactNode } from 'react';
import './About.css';
import { useTranslations } from 'next-intl';

export default function AboutPage(): ReactNode {
  const t = useTranslations('AboutPage');
  return (
    <div className="about-container">
      <p>
        {t('overall')}
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          {t('link')}
        </a>
      </p>
      <p>{t('summary-1')}</p>
      <p>{t('summary-2')}</p>
    </div>
  );
}
