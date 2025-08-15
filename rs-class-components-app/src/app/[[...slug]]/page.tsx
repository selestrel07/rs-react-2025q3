import { ClientOnly } from './client.tsx';

export function generateStaticParams() {
  return [{ slug: [] }, { slug: ['main'] }];
}

export default function Page() {
  return <ClientOnly />;
}
