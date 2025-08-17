import { redirect } from '../../i18n/navigation';

export default async function BasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/main/?page=1', locale: locale });
}
