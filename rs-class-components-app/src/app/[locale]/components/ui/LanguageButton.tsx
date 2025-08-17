'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from '../../../../i18n/navigation';
import { useLocale } from 'use-intl';

export default function LanguageButton() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const newLocale = locale === 'en' ? 'ru' : 'en';

  const handleClick = () => {
    const pathChunks = pathname.split('/');
    pathChunks[1] = newLocale;
    const newPathname = pathChunks.join('/');

    router.push(newPathname);
  };

  return (
    <button onClick={handleClick}>
      {locale === 'en' ? 'Lang: EN' : 'Язык: Рус'}
    </button>
  );
}
