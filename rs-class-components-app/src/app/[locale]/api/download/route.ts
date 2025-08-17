import { fetchArtistData } from '../data-fetch';
import type { ArtistData } from '../../types/artist-data';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams?.get('ids');
  const selectedIds = ids?.split(',').map(Number) ?? [];
  const artists = await Promise.all(
    selectedIds.map((id) =>
      fetchArtistData(id)
        .then((response): Promise<ArtistData> => response.json())
        .then((artistData) => artistData.data)
    )
  );

  let csv = 'id,title,birth_date,death_date,alt_titles';
  for (const artist of artists) {
    csv += `\n${artist.id},${artist.title},`;
    csv += `${artist.birth_date ?? 'unknown'},${artist.death_date ?? 'unknown'},`;
    csv += `${artist.alt_titles?.join('|') ?? 'no alternative titles'}`;
  }

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=${artists.length}_item${artists.length > 1 ? 's' : ''}.csv`,
    },
  });
}
