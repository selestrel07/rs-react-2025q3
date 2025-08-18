'use server';

import { cookies } from 'next/headers';

export async function setSearchCookie(query: string) {
  const cookieStore = await cookies();
  cookieStore.set('search', query);
}
