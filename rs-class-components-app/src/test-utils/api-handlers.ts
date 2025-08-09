import { http, HttpResponse } from 'msw';
import { artistsMockData } from './test-data.ts';

export const handlers = [
  http.get('https://api.artic.edu/api/v1/artists/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    if (query && query === 'error') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      data: [
        {
          id: 2,
          api_link: 'https://api.artic.edu/api/v1/agents/2',
        },
        {
          id: 3,
          api_link: 'https://api.artic.edu/api/v1/agents/3',
        },
        {
          id: 4,
          api_link: 'https://api.artic.edu/api/v1/agents/4',
        },
        {
          id: 6,
          api_link: 'https://api.artic.edu/api/v1/agents/6',
        },
        {
          id: 5,
          api_link: 'https://api.artic.edu/api/v1/agents/5',
        },
      ],
      pagination: {
        total_pages: 2,
      },
    });
  }),
  http.get<{ id: string }>(
    'https://api.artic.edu/api/v1/agents/:id',
    ({ params }) => {
      const artist = artistsMockData.find(
        (artist) => artist.data.id === +params.id
      );
      if (!artist) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(artist);
    }
  ),
];
