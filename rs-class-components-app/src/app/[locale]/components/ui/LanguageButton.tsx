'use client';

import { usePathname, useRouter } from '../../../../i18n/navigation';
import { useLocale } from 'use-intl';

export default function LanguageButton() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const newLocale = locale === 'en' ? 'ru' : 'en';

  const handleClick = () => {
    router.push(`${pathname}${window.location.search}`, { locale: newLocale });
  };

  return (
    <button onClick={handleClick}>
      {locale === 'en' ? 'Lang: EN' : 'Язык: Рус'}
    </button>
  );
}
