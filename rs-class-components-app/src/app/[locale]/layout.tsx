import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../../index.css';
import StoreProvider from './store/StoreProvider';
import Header from './components/ui/Header';
import PageWrapper from './(pages)/PageWrapper';
import { NextIntlClientProvider } from 'next-intl';
import { hasLocale } from 'use-intl';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'React App (Next.js)',
  description:
    'React App (Next.js) is an application developed in scope of RS School 2025 Q3 React Course',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <StoreProvider>
            <PageWrapper>
              <NextIntlClientProvider>
                <div className="page-wrapper">
                  <Header />
                  {children}
                </div>
              </NextIntlClientProvider>
            </PageWrapper>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
